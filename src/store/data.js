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

export const SubplebbitSideItem = [
  {
    name: 'Overview',
    children: [
      { name: 'Queues', id: 'modqueue', icon: AiOutlineFileProtect },
      { name: 'Modmail', id: 'mail', icon: MdMailOutline, isExternal: true },
      { name: 'Scheduled Posts', id: 'scheduledposts', icon: AiOutlineCalendar },
      { name: 'User Management', id: 'moderators', icon: BiUser },
    ],
  },
  {
    name: 'Moderation',
    children: [
      { name: 'Rules and Removal Reasons', id: 'rules', disabled: true, icon: AiOutlineFileText },
      { name: 'User Flair', id: 'userflair', disabled: true, icon: AiOutlineTag },
      { name: 'Content Controls', id: 'settings', disabled: true, icon: VscSourceControl },
      { name: 'Safety', id: 'log', icon: BsKey },
    ],
  },

  {
    name: 'Content',
    children: [
      { name: 'Wiki', id: 'wiki/index', icon: RiBookLine },
      { name: 'Post Flair', id: 'postflair', disabled: true, icon: AiOutlineTag },
    ],
  },
  {
    name: 'Settings',
    children: [
      {
        name: 'General Settings',
        id: 'edit?page=community',
        disabled: true,
        icon: MdOutlineSettings,
      },
      { name: 'Post and Comment', id: 'edit?page=posts', disabled: true, icon: TiDocumentText },
      { name: 'Community Appearance', id: '?styling=true', disabled: true, icon: BiBrush },
      {
        name: 'Notifications',
        id: 'edit?page=notifications',
        disabled: true,
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
    disabled: true,
  },
];

export const subQueuesTabs = [
  {
    name: 'Mod Queue',
    id: 'modqueue',
  },
  {
    name: 'Reported',
    id: 'reports',
  },
  {
    name: 'Removed',
    id: 'spam',
  },
  {
    name: 'Edited',
    id: 'edited',
  },
  {
    name: 'Unmoderated',
    id: 'unmoderated',
  },
];
export const subUserMgmtTabs = [
  {
    name: 'Banned',
    id: 'banned',
  },
  {
    name: 'Muted',
    id: 'muted',
  },
  {
    name: 'Approved',
    id: 'contributors',
  },
  {
    name: 'Moderators',
    id: 'moderators',
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
