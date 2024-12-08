import React, { FC, useCallback } from "react";
import { FlatList, ListRenderItemInfo, Modal, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Device } from "react-native-ble-plx";
import Colors from "../../constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";

type DeviceModalListItemProps = {
  item: ListRenderItemInfo<Device>;
  connectToPeripheral: (device: Device) => void;
  closeModal: () => void;
};

type DeviceModalProps = {
  devices: Device[];
  visible: boolean;
  connectToPeripheral: (device: Device) => void;
  closeModal: () => void;
};

const DeviceModalListItem: FC<DeviceModalListItemProps> = (props) => {
  const { item, connectToPeripheral, closeModal } = props;

  const connectAndCloseModal = useCallback(() => {
    connectToPeripheral(item.item);
    closeModal();
  }, [closeModal, connectToPeripheral, item.item]);

  return (
    <TouchableOpacity
      onPress={connectAndCloseModal}
      style={modalStyle.ctaButton}
    >
      <Text style={modalStyle.ctaButtonText}>
        {item.item.name ?? item.item.localName}
      </Text>
    </TouchableOpacity>
  );
};

const DeviceModal: FC<DeviceModalProps> = (props) => {
  const { devices, visible, connectToPeripheral, closeModal } = props;

  const renderDeviceModalListItem = useCallback(
    (item: ListRenderItemInfo<Device>) => {
      return (
        <DeviceModalListItem
          item={item}
          connectToPeripheral={connectToPeripheral}
          closeModal={closeModal}
        />
      );
    },
    [closeModal, connectToPeripheral]
  );

  return (
    <Modal
      // style={modalStyle.modalContainer}
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <View style={modalStyle.modalOverlay}>
        <View style={modalStyle.modalBox}>
          <TouchableOpacity style={modalStyle.closeButton} onPress={closeModal}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
          <Text style={modalStyle.modalTitle}>Toque el dispositivo a conectar</Text>
          <FlatList
            contentContainerStyle={modalStyle.modalFlatlistContiner}
            data={devices}
            renderItem={renderDeviceModalListItem}
          />
        </View>
      </View>
    </Modal>
  );
};

const modalStyle = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalFlatlistContiner: {
    flex: 1,
    justifyContent: "center",
  },
  modalBox: {
    width: '95%',
    height: '75%',
    backgroundColor: Colors.tertiary,
    borderRadius: 15,
    padding: 20,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: 'inter-semibold',
    textAlign: 'center',
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 8,
  },
  ctaButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
});

export default DeviceModal;