
import React from 'react';
import { useWallet } from '../context/WalletProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useBalance } from 'wagmi';

const WalletInfo = () => {
  const { activeWallet } = useWallet();
  
  const { data: balanceData, isLoading } = useBalance({
    address: activeWallet?.address,
  });
  
  if (!activeWallet) {
    return null;
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet Information</CardTitle>
        <CardDescription>
          View details about your active wallet
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium">Address</p>
              <p className="text-sm text-muted-foreground break-all">
                {activeWallet.address}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Wallet Type</p>
              <p className="text-sm text-muted-foreground">
                {activeWallet.name}
              </p>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium">Balance</p>
            {isLoading ? (
              <Skeleton className="h-5 w-20" />
            ) : (
              <p className="text-sm text-muted-foreground">
                {balanceData?.formatted || '0'} {balanceData?.symbol || 'ETH'}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletInfo;
