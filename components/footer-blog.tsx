import { Icons } from '@/components/icons';
import { Separator } from '@/components/ui/separator';
import { Eclipse, Github } from 'lucide-react';

export default function FooterBlog() {
  return (
    <footer className="w-full py-10">
      <Separator className="w-4/5 mx-auto mb-8" />
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex items-center space-x-2">
            <Icons.Eclipse className="w-6 h-6" />
            <span className="text-xl font-bold">HEALXYZ</span>
          </div>
          <div className="flex flex-col items-center space-y-2 md:items-end md:space-y-0">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-muted-foreground">
                Built with ❤️ by{' '}
                <a
                  href="https://linkedin.com/in/wizardofhahz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Wizard of HAHZ
                </a>
              </p>
              <a
                href="https://linkedin.com/in/wizardofhahz/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="24"
                  height="24"
                  fill="currentColor"
                >
                  <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                </svg>
              </a>
            </div>
            <p className="text-xs text-center text-muted-foreground md:text-right">
              Note: Tag and follow @HAHZ on all Web5 socials!
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
