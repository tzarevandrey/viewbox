import { Modal } from "antd";
import { useAppSelector } from "../../../hooks"

export const BaseModal = () => {
  const {
    isOpened,
    Element
  } = useAppSelector(x => x.modal);
  return (
    <Modal
      open={isOpened}
      footer={null}
      closable={false}
      centered
      title={'null'}
    >
      {Element !== null && <Element />}
    </Modal>
  )
}