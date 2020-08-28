import React, { useState, useEffect, useCallback } from 'react';
import useAuth from '../../hooks/useAuth';
import { ReactComponent as SearchIcon } from '../../assets/icons/ic-search.svg';
import { ReactComponent as CloseIcon } from '../../assets/icons/ic-close.svg'; 
import Logo2x from '../../assets/logo/logo-nav.png';
import './styles.css';
import { Enterprise, getFilteredEnterprises, Params } from '../../services/getFilteredEnterprises';
import { getEnterprises } from '../../services/getEnterprises';
import { EnterpriseList } from '../../components/EnterpriseList/EnterpriseList';

interface NavBarProps {
    onClickSearch: () => void;
}

const NavBar: React.FC<NavBarProps> = ({onClickSearch}) => {
    const authContext = useAuth();
    return (
        <>  
            <button onClick={authContext.signOut} className="Logout-Button">Logout</button>
            <div className="Logo-Container">
                <img src={Logo2x} alt="Logo ioasys" className="Logo" />
            </div>
            <button className="Search-Button" onClick={onClickSearch}>
                <SearchIcon/>
            </button>
        </>
    );
};

interface SearchBarProps {
    onClickClose: () => void;
    searchEnterprises: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({onClickClose, searchEnterprises}) => {
    const [searchValue, setSearchValue] = useState('');
    const onChangeSearchValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSearchValue(event.currentTarget.value);
    };

    useEffect(() => {
        searchEnterprises(searchValue);
    }, [searchValue]);

    return (
        <div className='Input-Container'>
            <SearchIcon />
            <input
                type="text"
                value={searchValue}
                onChange={onChangeSearchValue}
                className="Input"
                autoFocus
                placeholder="Pesquisar"
            />
            <button className="Close-Button" onClick={onClickClose}>
                <CloseIcon/>
            </button>
        </div>
    );
};
export const Main: React.FC = () => {
    const authContext = useAuth();
    const [openSearch, setOpenSearch] = useState(false);
    const [enterprises, setEnterprises] = useState<Enterprise[]>([]);
    const [emptySearch, setEmptySearch] = useState(true);
    const loadEnterprises = useCallback(async (value: string): Promise<void> => {
        if(value) {
            const response = await getFilteredEnterprises({name: value});
            setEnterprises(response);
            setEmptySearch(false);
        } else {
            const response = await getEnterprises();
            setEnterprises(response);
            setEmptySearch(true);
        } 
    }, []);

    const onClickSearch = (): void => {
        setOpenSearch(true);
    };

    const onClickClose = (): void => {
        setOpenSearch(false);
    };
    return (
        <div className="Container">
            <nav className="Nav">
                {
                    openSearch ? <SearchBar onClickClose={onClickClose} searchEnterprises={async (value: string): Promise<void> => await loadEnterprises(value)}/> : <NavBar onClickSearch={onClickSearch}/>
                }
            </nav>
            <body className="Content-Container">
                <div className="Content">
                    {openSearch ? <EnterpriseList enterprises={enterprises}/> : <div className="Default-Content">Clique na busca para iniciar</div>}
                </div>
            </body>
        </div>
    );
};
