'use client';

import { Label } from 'recharts';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const GameDetailComment = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Label>Description</Label>
        <Input id="description" placeholder="Please leave a comment." />
        <Button size="sm" className="bg-lime-700">
          Up
        </Button>
        <Button size="sm" className="bg-rose-700">
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
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/03.png" alt="Image" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Olivia Martin
                    </p>
                    <p className="text-sm font-medium leading-none">
                      Hey it's real
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/03.png" alt="Image" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Olivia Martin
                    </p>
                    <p className="text-sm font-medium leading-none">
                      Hey it's real
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/03.png" alt="Image" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Olivia Martin
                    </p>
                    <p className="text-sm font-medium leading-none">
                      Hey it's real
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/03.png" alt="Image" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Olivia Martin
                    </p>
                    <p className="text-sm font-medium leading-none">
                      Hey it's real
                    </p>
                  </div>
                </div>
              </div>
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
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/03.png" alt="Image" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Olivia Martin
                    </p>
                    <p className="text-sm font-medium leading-none">
                      Hey it's real
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/03.png" alt="Image" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Olivia Martin
                    </p>
                    <p className="text-sm font-medium leading-none">
                      Hey it's real
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/03.png" alt="Image" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Olivia Martin
                    </p>
                    <p className="text-sm font-medium leading-none">
                      Hey it's real
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/avatars/03.png" alt="Image" />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Olivia Martin
                    </p>
                    <p className="text-sm font-medium leading-none">
                      Hey it's real
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
