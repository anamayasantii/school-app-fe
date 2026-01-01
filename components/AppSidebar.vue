<script setup lang="ts">
import type { SidebarProps } from '@/components/ui/sidebar'

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-vue-next"
import NavMain from '@/components/NavMain.vue'
import NavProjects from '@/components/NavProjects.vue'
import NavUser from '@/components/NavUser.vue'
import TeamSwitcher from '@/components/TeamSwitcher.vue'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar'

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsible: "icon",
})

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Home",
      url: "/dashboard",
      icon: SquareTerminal,
    },
    {
      title: "User",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "User Lists",
          url: "/dashboard/user-lists",
        },
        // {
        //   title: "Add School",
        //   url: "#",
        // },
      ],
    },
    {
      title: "School",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "School Lists",
          url: "/dashboard/school-lists",
        },
        // {
        //   title: "Add School",
        //   url: "/dashboard/school-lists/add",
        // },
        // {
        //   title: "Add Highlight School",
        //   url: "/dashboard/school-lists/add-highlight",
        // }
      ],
    },
    {
      title: "Review",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Review Lists",
          url: "/dashboard/review-lists",
        },
        {
          title: "Review Approved",
          url: "/dashboard/review-lists/approved",
        },
        {
          title: "Review Rejects",
          url: "/dashboard/review-lists/rejected",
        },
      ],
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
}
</script>

<template>
  <Sidebar v-bind="props">
    <!-- <SidebarHeader>
      <TeamSwitcher :teams="data.teams" />
    </SidebarHeader> -->
    <SidebarContent>
      <NavMain :items="data.navMain" />
      <!-- <NavProjects :projects="data.projects" /> -->
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
</template>
