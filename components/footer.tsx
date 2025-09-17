import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { footerLinks } from '@/config/footer';
import {
  FacebookIcon,
  LinkedinIcon,
  XIcon,
  InstagramIcon
} from '@/components/svg';

export default function Footer() {
  return (
    <footer className="relative p-8 text-gray-300 bg-black">
      <div className="container grid justify-between grid-cols-1 gap-10 mx-auto md:grid-cols-3">
        <div>
          <h2 className="mb-4 font-bold text-gray-300 text-md">
            {footerLinks.getInTouch.title}
          </h2>
          <p className="mb-4 text-xl text-gray-300">
            We partner with global brands, from startups to industry leaders.{' '}
            <span className="font-bold text-white">Let's discuss.</span>
          </p>
          <h3 className="mb-2 text-sm font-bold text-gray-300">
            Subscribe to our Newsletter
          </h3>
          <form className="flex">
            <Input
              type="email"
              placeholder="name@email.com"
              className="flex-grow p-2 text-white bg-gray-800 border-black rounded-sm"
            />
            <Button className="ml-2 bg-gray-700">Subscribe</Button>
          </form>
        </div>
        <div className="flex flex-col items-center mx-auto text-xs">
          <div className="flex">
            <div className="mr-8">
              <h2 className="mb-4 text-sm font-bold">
                {footerLinks.pages.title}
              </h2>
              <ul>
                {footerLinks.pages.links.map((link, index) => (
                  <li key={index} className="mb-2">
                    <Link
                      href={link.href}
                      className="text-white"
                      prefetch={false}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-bold">
                {footerLinks.utilityPages.title}
              </h2>
              <ul>
                {footerLinks.utilityPages.links.map((link, index) => (
                  <li key={index} className="mb-2">
                    <Link
                      href={link.href}
                      className="text-white"
                      prefetch={false}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="justify-end mx-auto mb-4 text-sm font-bold w-fit">
          <h2 className="flex mb-4 text-sm font-bold">
            {footerLinks.location.title}
          </h2>
          <p className="mb-4 text-xs max-w-[150px]">
            {footerLinks.location.address}
          </p>
          <h3 className="mb-2 text-sm font-bold">
            {footerLinks.location.socialLinksTitle}
          </h3>
          <div className="flex space-x-3">
            <Link href="#" className="text-white" prefetch={false}>
              <XIcon className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-white" prefetch={false}>
              <FacebookIcon className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-white" prefetch={false}>
              <InstagramIcon className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-white" prefetch={false}>
              <LinkedinIcon className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 text-xs text-center text-gray-300">
        <p>
          Copyright ©2025{' '}
          <span className="font-bold text-white">HAHZ.LIVE</span>. All rights
          reserved.
        </p>
      </div>
      {/* <div className="absolute bottom-0 right-0 text-[10rem] text-bold text-gray-300 opacity-30">
        ROSS
      </div> */}
    </footer>
  );
}
