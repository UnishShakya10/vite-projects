import {
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Calendar, Edit, Mail, MapPin, Phone, Shield, User } from "lucide-react";


const UserProfile = () => {
  const user = {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+977 9812345678",
    location: "Kathmandu, Nepal",
    role: "USER",
    joinedDate: "January 15, 2025",
    avatar: "https://i.pravatar.cc/150?img=12",
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <Title order={2} className="text-gray-800">
              My Profile
            </Title>

            <Text c="dimmed" size="sm" mt={4}>
              Manage your personal information and account details
            </Text>
          </div>

          <Button
            leftSection={<Edit size={17} />}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Edit Profile
          </Button>
        </div>

        {/* Profile Card */}
        <Card
          shadow="sm"
          radius="md"
          withBorder
          className="mb-6 overflow-hidden"
          padding={0}
        >
          {/* Cover */}
          <div className="h-32 bg-linear-to-r from-blue-600 via-indigo-600 to-purple-600" />

          <div className="px-5 pb-6 md:px-8">
            {/* Avatar */}
            <div className="-mt-12 mb-5 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <Avatar
                src={user.avatar}
                size={100}
                radius={100}
                className="border-4 border-white shadow-md"
              >
                JD
              </Avatar>

              <Badge
                size="lg"
                radius="sm"
                color={user.role === "ADMIN" ? "red" : "blue"}
                leftSection={<Shield size={15} />}
              >
                {user.role}
              </Badge>
            </div>

            {/* Name */}
            <div className="mb-6">
              <Title order={3}>{user.fullName}</Title>

              <Text c="dimmed" size="sm">
                {user.email}
              </Text>
            </div>

            <Divider mb="lg" />

            {/* User Information */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-50 p-2.5 text-blue-600">
                  <User size={20} />
                </div>

                <div>
                  <Text size="xs" c="dimmed">
                    Full Name
                  </Text>
                  <Text size="sm" fw={500}>
                    {user.fullName}
                  </Text>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-green-50 p-2.5 text-green-600">
                  <Mail size={20} />
                </div>

                <div>
                  <Text size="xs" c="dimmed">
                    Email Address
                  </Text>
                  <Text size="sm" fw={500}>
                    {user.email}
                  </Text>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-purple-50 p-2.5 text-purple-600">
                  <Phone size={20} />
                </div>

                <div>
                  <Text size="xs" c="dimmed">
                    Phone Number
                  </Text>
                  <Text size="sm" fw={500}>
                    {user.phone}
                  </Text>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-orange-50 p-2.5 text-orange-600">
                  <MapPin size={20} />
                </div>

                <div>
                  <Text size="xs" c="dimmed">
                    Location
                  </Text>
                  <Text size="sm" fw={500}>
                    {user.location}
                  </Text>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-pink-50 p-2.5 text-pink-600">
                  <Calendar size={20} />
                </div>

                <div>
                  <Text size="xs" c="dimmed">
                    Member Since
                  </Text>
                  <Text size="sm" fw={500}>
                    {user.joinedDate}
                  </Text>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-indigo-50 p-2.5 text-indigo-600">
                  <Shield size={20} />
                </div>

                <div>
                  <Text size="xs" c="dimmed">
                    Account Role
                  </Text>
                  <Text size="sm" fw={500}>
                    {user.role}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Card shadow="sm" radius="md" withBorder>
            <Text size="sm" c="dimmed">
              Orders
            </Text>

            <Text size="xl" fw={700} className="mt-1">
              24
            </Text>

            <Text size="xs" c="green" mt={4}>
              +12% this month
            </Text>
          </Card>

          <Card shadow="sm" radius="md" withBorder>
            <Text size="sm" c="dimmed">
              Completed
            </Text>

            <Text size="xl" fw={700} className="mt-1">
              18
            </Text>

            <Text size="xs" c="blue" mt={4}>
              75% completion rate
            </Text>
          </Card>

          <Card shadow="sm" radius="md" withBorder>
            <Text size="sm" c="dimmed">
              Account Status
            </Text>

            <div className="mt-2">
              <Badge color="green" variant="light">
                Active
              </Badge>
            </div>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card shadow="sm" radius="md" withBorder>
          <Group justify="space-between" mb="md">
            <div>
              <Title order={4}>Recent Activity</Title>
              <Text size="sm" c="dimmed">
                Your latest account activity
              </Text>
            </div>
          </Group>

          <Stack gap="md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />

                <div>
                  <Text size="sm" fw={500}>
                    Logged into your account
                  </Text>

                  <Text size="xs" c="dimmed">
                    Kathmandu, Nepal
                  </Text>
                </div>
              </div>

              <Text size="xs" c="dimmed">
                2 hours ago
              </Text>
            </div>

            <Divider />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />

                <div>
                  <Text size="sm" fw={500}>
                    Profile information updated
                  </Text>

                  <Text size="xs" c="dimmed">
                    Account settings
                  </Text>
                </div>
              </div>

              <Text size="xs" c="dimmed">
                Yesterday
              </Text>
            </div>

            <Divider />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-2.5 w-2.5 rounded-full bg-purple-500" />

                <div>
                  <Text size="sm" fw={500}>
                    New order placed
                  </Text>

                  <Text size="xs" c="dimmed">
                    Order #ORD-1024
                  </Text>
                </div>
              </div>

              <Text size="xs" c="dimmed">
                3 days ago
              </Text>
            </div>
          </Stack>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;