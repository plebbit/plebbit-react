import {
  AiOutlineCalendar,
  AiOutlineFileProtect,
  AiOutlineFileText,
  AiOutlineTag,
} from 'react-icons/ai';
import { BiBrush, BiUser } from 'react-icons/bi';
import { BsEmojiSmile, BsKey } from 'react-icons/bs';
import {
  MdMailOutline,
  MdNotificationsNone,
  MdOutlineExplicit,
  MdOutlineSettings,
} from 'react-icons/md';
import { RiBookLine } from 'react-icons/ri';
import { TiDocumentText } from 'react-icons/ti';
import { VscSourceControl } from 'react-icons/vsc';

export const subQueuesTabs = [
  {
    name: 'Mod Queue',
    id: 'modqueue',
    disabled: true,
  },
  {
    name: 'Reported',
    id: 'reports',
    disabled: true,
  },
  {
    name: 'Removed',
    id: 'spam',
    disabled: true,
  },
  {
    name: 'Edited',
    id: 'edited',
    disabled: true,
  },
  {
    name: 'Unmoderated',
    id: 'unmoderated',
    disabled: true,
  },
];
export const subUserMgmtTabs = [
  {
    name: 'Banned',
    id: 'banned',
    disabled: true,
  },
  {
    name: 'Muted',
    id: 'muted',
    disabled: true,
  },
  {
    name: 'Approved',
    id: 'contributors',
    disabled: true,
  },
  {
    name: 'Moderators',
    id: 'moderators',
  },
];

export const SubRulesTabs = [
  {
    name: 'Rules',
    id: 'rules',
  },
  {
    name: 'Removal reasons',
    id: 'removal',
    disabled: true,
  },
];

export const SubUserFlairTabs = [
  {
    name: 'Setup',
    id: 'userflair',
  },
  {
    name: 'Assign',
    id: 'flair',
    disabled: true,
  },
];
export const SubplebbitSideItem = [
  {
    name: 'Overview',
    children: [
      {
        name: 'Queues',
        id: 'modqueue',
        icon: AiOutlineFileProtect,
        children: subQueuesTabs?.map((x) => x?.id),
      },
      { name: 'Modmail', id: 'mail', icon: MdMailOutline, isExternal: true, disabled: true },
      { name: 'Scheduled Posts', id: 'scheduledposts', icon: AiOutlineCalendar, disabled: true },
      {
        name: 'User Management',
        id: 'moderators',
        icon: BiUser,
        children: [...subUserMgmtTabs?.map((x) => x?.id)],
      },
    ],
  },
  {
    name: 'Moderation',
    children: [
      {
        name: 'Rules and Removal Reasons',
        id: 'rules',
        icon: AiOutlineFileText,
        children: [...SubRulesTabs?.map((x) => x?.id)],
      },
      {
        name: 'User Flair',
        id: 'userflair',
        icon: AiOutlineTag,
        children: [...SubUserFlairTabs?.map((x) => x?.id)],
      },
      { name: 'Content Controls', id: 'settings', disabled: true, icon: VscSourceControl },
      { name: 'Safety', id: 'log', icon: BsKey, disabled: true },
    ],
  },

  {
    name: 'Content',
    children: [
      { name: 'Wiki', id: 'wiki', icon: RiBookLine, disabled: true },
      { name: 'Post Flair', id: 'postflair', icon: AiOutlineTag },
    ],
  },
  {
    name: 'Settings',
    children: [
      {
        name: 'General Settings',
        id: 'edit?page=community',
        icon: MdOutlineSettings,
      },
      { name: 'Post and Comment', id: 'edit?page=posts', icon: TiDocumentText },
      { name: 'Community Appearance', id: '?styling=true', icon: BiBrush, custom: true },
      {
        name: 'Notifications',
        id: 'edit?page=notifications',
        icon: MdNotificationsNone,
      },
      {
        name: 'Content Rating',
        id: 'edit?page=content_tag',
        disabled: true,
        icon: MdOutlineExplicit,
      },
      { name: 'Emojis', id: 'emojis', disabled: true, icon: BsEmojiSmile },
    ],
  },
];

export const projectLinks = [
  { label: 'Report a Bug', link: 'https://t.me/plebbit' },
  { label: 'PLEB Token', link: 'https://plebbit.eth.limo' },
  { label: 'Plebbit NFTs', link: 'https://plebbit.eth.limo' },
  {
    label: 'Desktop & Android App',
    link: 'https://github.com/plebbit/plebbit-react/releases/latest',
  },
  { label: 'Whitepaper', link: 'https://github.com/plebbit/whitepaper/discussions/2' },
  { label: 'Github', link: 'https://github.com/plebbit' },
  {
    label: 'Open Source License',
    link: 'https://github.com/plebbit/plebbit-js/blob/master/LICENSE',
  },
];
export const projectSocialLinks = [
  { label: 'About', link: 'https://medium.com/@plebbit/about-plebbit-3edb35ac48f1' },
  {
    label: 'We Are Hiring JS Devs',
    link: 'https://medium.com/@plebbit/plebbit-is-hiring-javascript-developers-cc20980b42ae',
  },
  { label: 'Twitter', link: 'https://twitter.com/getplebbit' },
  { label: 'Telegram', link: 'https://t.me/plebbit' },
  { label: 'Blog', link: 'https://medium.com/@plebbit' },
  { label: 'Discord', link: 'https://discord.gg/E7ejphwzGW' },
  { label: 'Matrix', link: 'https://matrix.to/#/#plebbit:plebbitchat.org' },
];

export const subStylingData = [
  {
    name: 'Appearance',
    id: 'appearance',
    children: [
      {
        name: 'Color theme',
        id: 'color',
      },
      {
        name: 'Name & icon',
        id: 'nameAndIcon',
      },
      {
        name: 'Banner',
        id: 'banner',
      },
      {
        name: 'Menu',
        id: 'menu',
        disabled: true,
      },
      {
        name: 'Posts',
        id: 'posts',
        disabled: true,
      },
      {
        name: 'CSS',
        id: 'css',
        disabled: true,
      },
    ],
  },

  {
    name: 'Structure',
    id: 'structure',
    children: [
      {
        name: 'Menu links',
        id: 'menuLinks',
        disabled: true,
      },
      {
        name: 'Sidebar widgets',
        id: 'widgets',
        disabled: true,
      },
    ],
  },
];
