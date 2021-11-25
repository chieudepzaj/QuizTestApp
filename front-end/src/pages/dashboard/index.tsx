import { Button } from 'antd';
import React from 'react';
import { Navigate } from 'react-router';
import routePath from 'src/constants/routePath';
import Header from 'src/layouts/header';
import { useAppSelector } from 'src/store/hooks';

import './styles.scss';

const Dashboard: React.FC = () => {
    const user = useAppSelector(user => user.account.user);

    return (
        <>
            {!user.name && <Navigate to={routePath.PROFILE} />}
            <Header />
            <div className='dashboard'>
                @@Teacher
                <Button>
                    Create new test
                </Button>
                <Button>
                    Manage class
                </Button>

                @@Student
                <Button>
                    Take test
                </Button>
                <Button>
                    Testing result
                </Button>

                @@Both
                <Button>
                    Manage profile
                </Button>
            </div>
        </>
    );
};

export default Dashboard;