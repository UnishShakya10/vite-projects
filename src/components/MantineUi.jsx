import {
  Button,
  Drawer,
  PasswordInput,
  Rating,
  Tabs,
  TextInput,
  Select,
} from "@mantine/core";

import { useDisclosure } from "@mantine/hooks";

import {
  DownloadCloud,
  ImageIcon,
  Lock,
  MessageCircle,
  PersonStanding,
  Settings,
} from "lucide-react";

const MantineUi = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div className="px-20 py-10 space-y-6">

      <Button rightSection={<DownloadCloud size={14} />}>
        Download
      </Button>

      <TextInput
        variant="filled"
        label="Input label"
        description="Input description"
        placeholder="Input placeholder"
        leftSection={<PersonStanding size={18} />}
      />

      <PasswordInput
        label="Input label"
        description="Input description"
        placeholder="Input placeholder"
        leftSection={<Lock size={18} />}
      />

      <Select
        label="Your favorite library"
        placeholder="Pick value"
        data={["React", "Angular", "Vue", "Svelte"]}
      />

      <Rating defaultValue={2} />

      <Tabs defaultValue="gallery">
        <Tabs.List>
          <Tabs.Tab
            value="gallery"
            leftSection={<ImageIcon size={12} />}
          >
            Gallery
          </Tabs.Tab>

          <Tabs.Tab
            value="messages"
            leftSection={<MessageCircle size={12} />}
          >
            Messages
          </Tabs.Tab>

          <Tabs.Tab
            value="settings"
            leftSection={<Settings size={12} />}
          >
            Settings
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="gallery" pt="md">
          Gallery tab content
        </Tabs.Panel>

        <Tabs.Panel value="messages" pt="md">
          Messages tab content
        </Tabs.Panel>

        <Tabs.Panel value="settings" pt="md">
          Settings tab content
        </Tabs.Panel>
      </Tabs>

      <Button variant="default" onClick={open}>
        Open Drawer
      </Button>

      <Drawer
        opened={opened}
        onClose={close}
        title="Authentication"
        position="right"
        size="sm"
      >
        <div className="space-y-4">

          <TextInput
            label="Email"
            placeholder="Enter your email"
          />

          <PasswordInput
            label="Password"
            placeholder="Enter your password"
          />

          <Button fullWidth>
            Login
          </Button>

        </div>
      </Drawer>

    </div>
  );
};

export default MantineUi;