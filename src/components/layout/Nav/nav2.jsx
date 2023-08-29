import React, { useState } from 'react'
import styles from './navbar.module.css'
import { useColorMode, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAccount, useAccountSubplebbits, useAccounts, useAuthorAvatar } from '@plebbit/plebbit-react-hooks';
import useStore from '../../../store/useStore';
import useVisible from '../../../hooks/useVisible';
import Sort from '../../../utils/sort';
import convertArrToObj from '../../../utils/convertArrToObj';
import getIsOnline from '../../../utils/getIsOnline';
import { ReactComponent as PlebLogo } from '../../svgs/logo.svg';
import { ReactComponent as PlebLogotext } from '../../svgs/plebbitText.svg';

const NavBar2 = ({ location, showStyleBar }) => {
    const bg = useColorModeValue('lightBody', 'darkBody');
    const mainColor = useColorModeValue('lightText2', 'darkText1');
    const iconColor = useColorModeValue('lightIcon', 'darkIcon');
    const iconColor2 = useColorModeValue('lightIcon2', 'darkText1');
    const navBorder = useColorModeValue('#edeff1', '#343536');
    const { colorMode, toggleColorMode } = useColorMode();
    const navigate = useNavigate();
    const inputBg = useColorModeValue('lightInputBg', 'darkInputBg');
    const { accounts: accountLists } = useAccounts();
    const { accountSubplebbits } = useAccountSubplebbits()
    const profile = useAccount();
    const { imageUrl: authorAvatarImageUrl } = useAuthorAvatar({ author: profile?.author });
    const {
        device,
        version,
        setPostView,
        postView,
        homeAdd,
        subPlebbitData: gitData,
        subPlebbitDefData,
        showSide,
        setShowSide,
    } = useStore(state => state);

    const userTheme = profile?.plebbitReactOptions?.darkMode


    const toggleTheme = () => {
        toggleColorMode();
        setAccount({
            ...profile,
            plebbitReactOptions: {
                darkMode: !Boolean(userTheme),
            },
        });
    };

    const [showDropDown, setShowDropDown] = useState(false);
    const { ref, showComponent, setShowComponent } = useVisible(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenCreate, onOpen: onOpenCreate, onClose: onCloseCreate } = useDisclosure();
    const subPlebbitData = Sort(
        convertArrToObj(
            [gitData, subPlebbitDefData?.filter((x) => x !== undefined)]?.flat(),
            'address',
            true
        ),
        (x) => getIsOnline(x?.updatedAt),
        true
    );


    const toast = useToast();

    const handleCreateAccount = async () => {
        await createAccount();
        toast({
            title: 'Create Account.',
            description: 'Account Created Successfully',
            status: 'success',
            duration: 5000,
            isClosable: true,
        });
    };
    return (
        <header className={ styles.wrapper }><div className={ styles.nav_wrapper }>
            <div className={ styles.nav_left }>
                <Link aria-label='Home' className={ styles.logo_cont } to="/">
                    <PlebLogo className={ styles.logo } />
                    <PlebLogotext className={ styles.logo_text } />
                </Link>
            </div>
        </div>
        </header>
    )
}

export default NavBar2