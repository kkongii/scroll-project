'use client';

import { Label } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';

// 랜덤 지갑 주소를 생성하는 함수
const generateRandomWalletAddress = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return address;
};

// 지갑 주소를 축약하는 함수
const shortenAddress = (address) => {
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
};

export const GameDetailComment = () => {
  // 서로 다른 지갑 주소 생성
  const walletAddresses = Array.from({ length: 8 }, generateRandomWalletAddress);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Label>Description</Label>
        <Input id="description" placeholder="Please leave a comment." />
        <Button
          className="bg-lime-700 bg-[#00A29A] text-white w-200 h-110 object-contain cursor-pointer active:bg-[#66C2B8] transition-transform duration-75 active:scale-95 hover:bg-[#00A29A]"
        >
          Up
        </Button>
        <Button
          className="bg-rose-700 bg-[#C73535] text-white w-200 h-110 object-contain cursor-pointer active:bg-[#E57373] transition-transform duration-75 active:scale-95 hover:bg-[#C73535]"
        >
          Down
        </Button>
      </div>
      <div className="ml-5 mr-5 flex space-x-4">
        <div className="w-1/2 space-y-4">
          <div className="space-y-4">
          <div className="flex items-center mb-2">
              <span className="flex items-center mb-2 text-xs font-bold border border-[#00A29A] text-[#00A29A] rounded-[15px] py-1 px-3 mr-5">
                Price Up
              </span>
              <span className="text-[#B6B6B6] text-[11px]">+213 Comment</span>
            </div>
            <div className="grid gap-6">
              {walletAddresses.slice(0, 4).map((address, index) => (
                <div key={index} className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/avatars/03.png" alt="Image" />
                      <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {shortenAddress(address)}
                      </p>
                      <p className="text-sm font-medium leading-none">
                        Hey it's real
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-1/2 space-y-4">
          <div className="space-y-4">
          <div className="flex items-center mb-2">
              <span className="flex items-center mb-2 text-xs font-bold border border-[#C73535] text-[#C73535] rounded-[15px] py-1 px-3 mr-5">
                Price Down
              </span>
              <span className="text-[#B6B6B6] text-[11px]">+98 Comment</span>
            </div>
            <div className="grid gap-6">
              {walletAddresses.slice(4, 8).map((address, index) => (
                <div key={index} className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src="/avatars/03.png" alt="Image" />
                      <AvatarFallback>OM</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {shortenAddress(address)}
                      </p>
                      <p className="text-sm font-medium leading-none">
                        Hey it's real
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
