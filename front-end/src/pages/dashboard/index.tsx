import { Button } from 'antd';
import React from 'react';
import Header from 'src/layouts/header';

import './styles.scss';

const Dashboard: React.FC = () => {
    return (
        <>
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