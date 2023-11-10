import ThemeRegistry from '@/components/theme-registry/theme.registry';
import NextAuthWrapper from '@/lib/next.auth.wrapper';
import { TrackContextProvider } from '@/lib/track.wrapper';
import { ToastProvider } from '@/utils/toast';
import Image from 'next/image';
import image from '../../public/flowers.jpg'


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {/* <img src='flowers.jpg' alt='flowers image' /> */}
        <Image
          src={image}
          alt='flowers image'
          title='flowers'
          sizes="100vw"
          // Make the image display full width
          style={{
            width: '100%',
            height: 'auto',
          }}
        />

        {/* <ThemeRegistry>
          <NextAuthWrapper>
            <ToastProvider>
              <TrackContextProvider>
                {children}
              </TrackContextProvider>
            </ToastProvider>
          </NextAuthWrapper>
        </ThemeRegistry> */}
      </body>
    </html>
  );
}
