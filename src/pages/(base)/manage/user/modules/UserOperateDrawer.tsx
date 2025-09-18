import { useRequest } from '@sa/hooks';
import { Button, Drawer, Flex, Form, Input, Radio, Select } from 'antd';
import type { FC } from 'react';

import { enableStatusOptions, userGenderOptions } from '@/constants/business';
import { useFormRules } from '@/features/form';
import { fetchGetAllRoles } from '@/service/api';

interface OptionsProps {
  label: string;
  value: number;
}

type Model = Pick<Api.SystemManage.User, 'email' | 'gender' | 'nickname' | 'phone' | 'roles' | 'status' | 'username'>;

type RuleKey = Extract<keyof Model, 'status' | 'username'>;

function getOptions(item: Api.SystemManage.AllRole) {
  return {
    label: item.roleName,
    value: item.id
  };
}

const UserOperateDrawer: FC<Page.OperateDrawerProps> = ({ form, handleSubmit, onClose, open, operateType }) => {
  const { t } = useTranslation();

  const { data, run } = useRequest(fetchGetAllRoles, {
    manual: true
  });

  const { defaultRequiredRule } = useFormRules();

  const roleOptions: OptionsProps[] = data ? data.map(getOptions) : [];

  const rules: Record<RuleKey, App.Global.FormRule> = {
    status: defaultRequiredRule,
    username: defaultRequiredRule
  };

  useUpdateEffect(() => {
    if (open) {
      run();
    }
  }, [open]);

  return (
    <Drawer
      open={open}
      title={operateType === 'add' ? t('page.manage.user.addUser') : t('page.manage.user.editUser')}
      footer={
        <Flex justify="space-between">
          <Button onClick={onClose}>{t('common.cancel')}</Button>
          <Button
            type="primary"
            onClick={handleSubmit}
          >
            {t('common.confirm')}
          </Button>
        </Flex>
      }
      onClose={onClose}
    >
      <Form
        form={form}
        layout="vertical"
      >
        <Form.Item
          label={t('page.manage.user.userName')}
          name="username"
          rules={[rules.username]}
        >
          <Input placeholder={t('page.manage.user.form.userName')} />
        </Form.Item>

        <Form.Item
          label={t('page.manage.user.userGender')}
          name="gender"
        >
          <Radio.Group>
            {userGenderOptions.map(item => (
              <Radio
                key={item.value}
                value={item.value}
              >
                {t(item.label)}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label={t('page.manage.user.nickName')}
          name="nickname"
        >
          <Input placeholder={t('page.manage.user.form.nickName')} />
        </Form.Item>

        <Form.Item
          label={t('page.manage.user.userPhone')}
          name="phone"
        >
          <Input placeholder={t('page.manage.user.form.userPhone')} />
        </Form.Item>

        <Form.Item
          label={t('page.manage.user.userEmail')}
          name="email"
        >
          <Input placeholder={t('page.manage.user.form.userEmail')} />
        </Form.Item>

        <Form.Item
          label={t('page.manage.user.userStatus')}
          name="status"
          rules={[rules.status]}
        >
          <Radio.Group>
            {enableStatusOptions.map(item => (
              <Radio
                key={item.value}
                value={item.value}
              >
                {t(item.label)}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>

        <Form.Item
          label={t('page.manage.user.userRole')}
          name="roleIds"
        >
          <Select
            mode="multiple"
            options={roleOptions}
            placeholder={t('page.manage.user.form.userRole')}
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default UserOperateDrawer;
