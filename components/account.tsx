'use client';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

import { Button } from './ui/button';
import { ellipsisAddress } from '@/utils/strings';

export const Account = () => {
  const account = useAccount();

  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  return (
    <div className="flex items-center space-x-2">
      <h3 className="text-md mr-2">{ellipsisAddress(account.address)}</h3>
      <h3>
        {account.status === 'connected' ? (
          <Button onClick={() => disconnect()}>Disconnect</Button>
        ) : (
          connectors.map((connector) => (
            <Button key={connector.uid} onClick={() => connect({ connector })}>
              Connect
            </Button>
          ))
        )}
      </h3>
    </div>
  );
};
