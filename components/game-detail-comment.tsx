'use client';

import { Label } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';

// 랜덤 지갑 주소를 생성하는 함수
const generateRandomWalletAddress = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let address = '0x';
  for (let i = 0; i < 40; i++) {
    address += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return address;
};
// 서로 다른 지갑 주소 생성
const walletAddresses = Array.from({ length: 8 }, generateRandomWalletAddress);
// 지갑 주소를 축약하는 함수
const shortenAddress = (address: any) => {
  return `${address.slice(0, 6)}...${address.slice(-6)}`;
};

export const GameDetailComment = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Label>Description</Label>
        <Input id="description" placeholder="Please leave a comment." />
        <Button className="w-200 h-110 cursor-pointer bg-[#00A29A] bg-lime-700 object-contain text-white transition-transform duration-75 hover:bg-[#00A29A] active:scale-95 active:bg-[#66C2B8]">
          Up
        </Button>
        <Button className="w-200 h-110 cursor-pointer bg-[#C73535] bg-rose-700 object-contain text-white transition-transform duration-75 hover:bg-[#C73535] active:scale-95 active:bg-[#E57373]">
          Down
        </Button>
      </div>
      <div className="ml-5 mr-5 flex space-x-4">
        <div className="w-1/2 space-y-4">
          <div className="space-y-4">
            <div className="mb-2 flex items-center">
              <span className="mb-2 mr-5 flex items-center rounded-[15px] border border-[#00A29A] px-3 py-1 text-xs font-bold text-[#00A29A]">
                Price Up
              </span>
              <span className="text-[11px] text-[#B6B6B6]">+213 Comment</span>
            </div>
            <div className="grid gap-6">
              {walletAddresses.slice(0, 4).map((address, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between space-x-4"
                >
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
                        Hey its real
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
            <div className="mb-2 flex items-center">
              <span className="mb-2 mr-5 flex items-center rounded-[15px] border border-[#C73535] px-3 py-1 text-xs font-bold text-[#C73535]">
                Price Down
              </span>
              <span className="text-[11px] text-[#B6B6B6]">+98 Comment</span>
            </div>
            <div className="grid gap-6">
              {walletAddresses.slice(4, 8).map((address, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between space-x-4"
                >
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
                        Hey its not real
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
