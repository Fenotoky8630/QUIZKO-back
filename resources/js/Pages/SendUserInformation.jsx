import socket from '@/Utils/socket';
import React, { useState, useEffect } from 'react';

const SendUserInfo = () => {
 
    const [interviewActive, setInterviewActive] = useState(false);
    const [isInterviewExpired, setIsInterviewExpired] = useState(false);
    
    const userData = {id:1 ,name:"Antonio Ramanandraibe", registration_number:"2345"};
   
    useEffect(() => {
        socket.on('interviewActive', () => {
            setInterviewActive(true);
            socket.emit('startInterview', userData);
        });
        socket.on('interviewExpired', () => {
            setIsInterviewExpired(true);
        });
        return () => {
            socket.off('interviewActive');
            socket.off('interviewExpired');
        };
    }, []);


    return (
        <div>
            {/* {interviewActive ? (
                <div className='bg-red-800 p-3 rounded-md text-white m-2'>
                    Test en cours
                </div>
            ) : (
                <p className='bg-blue-800 p-3 rounded-md text-white m-2'>Test en attente.</p>
            )}
             {isInterviewExpired ? (
                <div className='bg-red-800 p-3 rounded-md text-white m-2'>
                    Test expiré
                </div>
            ) : (
                <p className='bg-blue-800 p-3 rounded-md text-white m-2'>Test non expiré</p>
            )} */}
        </div>
    );
};

export default SendUserInfo;
