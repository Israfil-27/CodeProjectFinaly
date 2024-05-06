import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetUserDetailsQuery, useUpdateUserMutation } from "../../slices/userApiSlices";
import { Form, Input, Button, Checkbox, message } from "antd";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import "./scss/userEdit.scss";

interface UserEditScreenProps {
  history: {
    push: (path: string) => void;
  };
}

const UserEditScreen: React.FC<UserEditScreenProps> = ({ history }) => {
  const { id: userId } = useParams<{ id: string }>();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { data: user, refetch } = useGetUserDetailsQuery(userId);
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    }
  }, [user, form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await updateUser({ userId, ...values });
      message.success("İstifadəçi uğurla yeniləndi");
      refetch();
      history.push("/admin/userlist");
    } catch (err) {
      message.error(err?.data?.message || err?.error);
    }
    setLoading(false);
  };

  return (
    <div className="user-edit-container">
      <div className="user-edit-header">
        <a href="/admin/userlist" className="go-back-button">
          Geri Dön
        </a>
        <h1>İstifadəçini Düzənlə</h1>
      </div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Ad" name="name" rules={[{ required: true, message: "Zəhmət olmasa adınızı daxil edin" }]}>
          <Input prefix={<UserOutlined />} placeholder="Adınız" />
        </Form.Item>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Zəhmət olmasa email adresinizi daxil edin" }]}>
          <Input prefix={<MailOutlined />} type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item name="isAdmin" valuePropName="checked">
          <Checkbox>İdarəçi</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            İstifadəçini Yenilə
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserEditScreen;
