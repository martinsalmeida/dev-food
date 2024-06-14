'use client';

import Image from 'next/image';
import { Button } from './ui/button';
import {
  HeartIcon,
  HomeIcon,
  ListOrderedIcon,
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  ScrollTextIcon,
} from 'lucide-react';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';

const Header = () => {
  const { data } = useSession();

  const handleSignInOnClick = () => signIn();
  const handleSignOutOnClick = () => signOut();

  return (
    <div className="flex justify-between pt-6 px-5">
      <div className="relative h-[30px] w-auto">
        <Link href={'/'}>
          <Image
            src="/logo.png"
            alt="DevFood"
            className="object-cover"
            width={100}
            height={30}
            style={{ width: '100%', height: 'auto' }}
          />
        </Link>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            className="border-none bg-transparent"
          >
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent className="w-[94vw]">
          <SheetHeader>
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>

          {data?.user ? (
            <>
              <div className="flex items-center justify-between pt-6">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={data?.user?.image as string | undefined}
                      alt="@shadcn"
                    />
                    <AvatarFallback>
                      {data?.user?.name?.split(' ')[0][0]}
                      {data?.user?.name?.split(' ')[1][0]}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-semibold">{data?.user?.name}</h3>
                    <span className="block text-xs text-muted-foreground">
                      {data?.user?.email}
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex justify-between items-center pt-6">
                <h2 className="font-semibold">Ola! Faça seu login</h2>
                <Button size="icon" onClick={handleSignInOnClick}>
                  <LogInIcon />
                </Button>
              </div>
            </>
          )}
          <div className="pt-5">
            <Separator className="h-[0.5px] bg-[#ccc]" />
          </div>

          <div className="pt-5">
            <Link href="/">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 rounded-full text-sm"
              >
                <HomeIcon size={16} />
                <span>Inicio</span>
              </Button>
            </Link>

            {data?.user && (
              <>
                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 rounded-full text-sm"
                  asChild
                >
                  <Link href="/my-orders">
                    <ScrollTextIcon size={16} />
                    <span>Meus pedidos</span>
                  </Link>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start gap-3 rounded-full text-sm"
                  asChild
                >
                  <Link href="/my-favorite-restaurants">
                    <HeartIcon size={16} />
                    <span>Restaurantes favoritos</span>
                  </Link>
                </Button>
              </>
            )}
          </div>

          <div className="pt-5 pb-2">
            <Separator className="h-[0.5px] bg-[#ccc]" />
          </div>

          {data?.user && (
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 rounded-full text-sm"
              onClick={handleSignOutOnClick}
            >
              <LogOutIcon size={16} />
              <span>Sair da conta</span>
            </Button>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Header;
