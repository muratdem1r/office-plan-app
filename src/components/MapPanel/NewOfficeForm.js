import { Button, Form, Input, Select, Modal, Upload, message } from "antd";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { createLayerGroup } from "map/helpers/LayerGroup/createLayerGroup";
import { addPlan } from "store/actions/mapActions";
import { getBase64 } from "map/helpers/getBase64";

function NewOfficeForm() {
  const dispatch = useDispatch();

  const { treeData, notification } = useSelector((state) => state);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [imageInfos, setImageInfos] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const formSubmitHandler = ({ name, floor }) => {
    const { layerGroup, extent } = createLayerGroup(imageInfos);

    const error = dispatch(addPlan({ layerGroup, extent, name, floor }));

    if (!error) {
      notification.success({
        message: "Ofis başarıyla eklendi.",
      });
      setIsModalOpen(false);
    } else {
      console.log(error);
      notification.error({
        message: "Hata",
        description: "Ofis eklenirken bir hata meydana geldi.",
      });
    }
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handlePreviewCancel = () => setPreviewOpen(false);

  const onChange = async ({ fileList, file }) => {
    if (file.type.includes("image/")) {
      if (file instanceof File) {
        const fr = new FileReader();

        fr.onload = () => {
          const img = new Image();

          img.onload = () => {
            setImageInfos({
              width: img.width,
              height: img.height,
              src: img.src,
            });
          };
          img.src = fr.result;
        };
        fr.readAsDataURL(file);
      }

      setImageList(fileList);
    } else {
      setImageList([]);
      message.error(<span>Lütfen bir resim yükleyin.</span>);
    }
  };

  return (
    <>
      <Button type="dashed" onClick={showModal}>
        Yeni Ofis
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
          size="large"
          onFinish={formSubmitHandler}
          validateMessages={{
            required: "Zorunlu alan.",
          }}
        >
          <Form.Item
            name="name"
            label="Firma Adı"
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
              {treeData.map((floor) => (
                <Select.Option key={floor.key} value={floor.key}>
                  {floor.key}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
              },
            ]}
            name="image"
            label="Kroki"
          >
            <Upload
              accept="image/*"
              multiple={false}
              listType="picture-card"
              fileList={imageList}
              onPreview={handlePreview}
              onChange={onChange}
              beforeUpload={() => false}
            >
              {imageList.length < 1 && "+ Yükle"}
            </Upload>
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
        <Modal
          open={previewOpen}
          title={previewTitle}
          footer={null}
          onCancel={handlePreviewCancel}
        >
          <img alt="example" src={previewImage} />
        </Modal>
      </Modal>
    </>
  );
}

export default NewOfficeForm;
