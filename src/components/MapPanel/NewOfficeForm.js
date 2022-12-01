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
        message: "Office Added",
      });
    } else {
      notification.error({
        message: "Duplicate Office",
        description: "There is an office with this name.",
      });
    }
  };

  return (
    <>
      <Button type="dashed" onClick={showModal}>
        New
      </Button>

      <Modal
        title="New Office Plan"
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
        >
          <Form.Item
            name="name"
            label="Office Name"
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
            label="Floor"
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
              Add Office Plan
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default NewOfficeForm;
