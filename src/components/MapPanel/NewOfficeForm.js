import React, { useState } from "react";
import { Button, Form, Input, Select, Modal } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { createLayerGroup } from "map/helpers";
import { newPlan } from "store/actions/mapActions";

function NewOfficeForm({ defaultFloor }) {
  const dispatch = useDispatch();
  const floors = useSelector((state) => state.floors);
  const notification = useSelector((state) => state.notification);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const formSubmitHandler = (e) => {
    const layerGroup = createLayerGroup(e.floor, e.name);

    const success = dispatch(newPlan(layerGroup));
    if (success) {
      notification.success({
        message: "Ofis başarıyla eklendi.",
      });
    } else {
      notification.error({
        message: "Ofis mevcut",
        description: "Bu isimde bir ofis mevcut.",
      });
    }
  };

  return (
    <>
      <Button type="dashed" onClick={showModal}>
        Yeni
      </Button>

      <Modal
        title="Yeni Ofis Planı"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          labelCol={{
            span: 7,
          }}
          wrapperCol={{
            span: 12,
          }}
          layout="horizontal"
          initialValues={{
            size: "large",
          }}
          fields={[
            {
              name: ["floor"],
              value: defaultFloor,
            },
            {
              name: ["name"],
              value: undefined,
            },
          ]}
          size="large"
          onFinish={formSubmitHandler}
          validateMessages={{
            required: "Zorunlu alan.",
          }}
        >
          <Form.Item
            name="name"
            label="Ofis Adı"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="floor"
            label="Kat"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select>
              {floors.map((floor) => (
                <Select.Option key={floor} value={floor}>
                  {floor}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Ofis Planı Ekle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default NewOfficeForm;
