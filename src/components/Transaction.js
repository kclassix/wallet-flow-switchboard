
import React, { useState } from 'react';
import { useWallet } from '../context/WalletProvider';
import { useSendTransaction, usePrepareSendTransaction } from 'wagmi';
import { parseEther } from 'viem';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Check } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Transaction = () => {
  const { activeWallet } = useWallet();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [txStatus, setTxStatus] = useState('');
  const { toast } = useToast();
  
  const { config } = usePrepareSendTransaction({
    to: recipient,
    value: amount ? parseEther(amount) : undefined,
    enabled: Boolean(recipient && amount && activeWallet?.address),
  });
  
  const { sendTransaction, isLoading } = useSendTransaction({
    ...config,
    onSuccess: (data) => {
      toast({
        title: "Transaction Sent",
        description: `Transaction hash: ${data.hash}`,
        duration: 5000,
      });
      setTxStatus('success');
    },
    onError: (error) => {
      toast({
        title: "Transaction Failed",
        description: error.message,
        variant: "destructive",
        duration: 5000,
      });
      setTxStatus('error');
    },
  });
  
  const handleSendTransaction = () => {
    if (!recipient || !amount) {
      toast({
        title: "Invalid Input",
        description: "Please provide a valid recipient address and amount",
        variant: "destructive",
      });
      return;
    }
    
    setTxStatus('pending');
    sendTransaction?.();
  };
  
  if (!activeWallet) {
    return null;
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Send Transaction</CardTitle>
        <CardDescription>Send ETH from your active wallet</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="recipient">Recipient Address</Label>
          <Input
            id="recipient"
            placeholder="0x..."
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>
        
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="amount">Amount (ETH)</Label>
          <Input
            id="amount"
            type="number"
            step="0.0001"
            placeholder="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        
        {txStatus === 'error' && (
          <div className="flex items-center gap-2 text-destructive text-sm">
            <AlertCircle size={16} />
            <span>Transaction failed</span>
          </div>
        )}
        
        {txStatus === 'success' && (
          <div className="flex items-center gap-2 text-primary text-sm">
            <Check size={16} />
            <span>Transaction sent successfully</span>
          </div>
        )}
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleSendTransaction} 
          disabled={!sendTransaction || isLoading || !recipient || !amount}
          className="w-full"
        >
          {isLoading ? "Sending..." : "Send Transaction"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Transaction;
