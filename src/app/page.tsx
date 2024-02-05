import Image from "next/image";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
export default function Home() {
  return (
    <>
      <div className="home overflow-hidden">
        <div className="overflow-hidden flex flex-col items-center text-center w-full h-screen ease-in-out">
          <div className="drop-shadow-md container text-4xl text-white mt-4 flex justify-center">
            <Image alt="Logo" src="/logo-prod.png" width={100} height={100} />
          </div>

          <div className="font-ProtestRiot absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 drop-shadow-md container text-6xl text-white mt-4 flex flex-col justify-center items-center">
            <div className="title">Divyanshu.</div>
            <div className="tagline text-lg m-2">
              I&apos;m from another planet.
            </div>
          </div>

          <div className="down-arrow text-8xl absolute bottom-0  font-ProtestRiot animate-bounce rotate-90">
            <div className="text rotate-90">{">"}</div>
          </div>
          <video
            loop
            muted
            autoPlay
            playsInline
            controls={false}
            className="object-cover -z-10 absolute h-full w-full"
          >
            <source src="/masthead-bg.m4v" type="video/m4v; codecs=hvc1" />
            <source src="/masthead-bg.webm" type="video/webm"></source>
            <source src="/masthead-bg.mp4" type="video/mp4"></source>
          </video>
        </div>
      </div>

      {/*  section 2 */}

      <div className="font-ProtestRiot about-me w-screen h-full bg-white p-4 text-black px-16">
        <div className="title text-2xl md:text-8xl">
          Ab<span className="underline">out me.</span>
        </div>
        <div className="description w-full text-2xl md:pl-16  mt-4 flex md:flex-row flex-col justify-center items-center m-2 ">
          <Image
            className="rounded-full w-1/2"
            alt="avatar-one"
            src="/coder-pika.jpeg"
            width={200}
            height={200}
          />
          <Balancer className="w-full text-center m-4">
            Greetings, I&apos;m Divyanshu Parihar, the bot maestro! Armed with
            5+ years of Python and Node.js wizardry, I&apos;ve conjured over 100
            whimsical bots. Beyond the digital realm, I&apos;ve woven my magic
            on production websites, adding a touch of enchantment. Join me, and
            let&apos;s turn your online aspirations into a comedy of code!
          </Balancer>
        </div>
        <div className="title text-4xl font-ProtestRiot pl-16 ">My Flex: </div>
        <div className="companies flex flex-col w-full h-full md:px-16 items-center overflow-x-auto scroll-mx-4 ">
          <div className="container rounded-md px-2 py-4 flex flex-col items-center md:flex-row md:justify-around md:max-w-1/2">
            <Link href="https://scale.com/" className="">
              <svg
                className="text-blue-950 w-28 "
                viewBox="0 0 489 157"
                width={100}
                height={50}
              >
                <path d="M352.083 156.702a7.581 7.581 0 01-7.582-7.582V7.582A7.581 7.581 0 01352.083 0a7.581 7.581 0 017.583 7.582V149.12a7.581 7.581 0 01-7.583 7.582zm129.674-19.861a7.581 7.581 0 00-.871-10.687 7.581 7.581 0 00-10.687.871c-7.835 9.223-19.563 14.513-32.182 14.513-20.904 0-37.911-17.007-37.911-37.911s17.007-37.91 37.911-37.91c16.986 0 31.177 12.204 34.257 28.306h-46.391a7.581 7.581 0 00-7.582 7.583 7.581 7.581 0 007.582 7.582h54.593a7.58 7.58 0 007.582-7.582v-1.012c0-27.595-22.448-50.044-50.044-50.044-29.267 0-53.077 23.81-53.077 53.077s23.814 53.075 53.08 53.075c17.076 0 33.019-7.24 43.74-19.861zm-162.53 12.279v-48.529c0-27.595-22.448-50.043-50.043-50.043-29.268 0-53.078 23.81-53.078 53.077s23.81 53.077 53.078 53.077a7.581 7.581 0 007.582-7.582 7.58 7.58 0 00-7.582-7.582c-20.904 0-37.911-17.007-37.911-37.911s17.007-37.91 37.911-37.91c19.231 0 34.879 15.645 34.879 34.879v48.526a7.58 7.58 0 007.582 7.582 7.585 7.585 0 007.582-7.584zM89.711 126.373c0-7.4-2.718-17.494-15.668-23.559-7.77-3.64-17.52-5.135-26.949-6.581-22.09-3.387-29.934-6.217-29.934-15.355 0-9.955 13.805-15.164 27.443-15.164 8.594 0 20.944 1.733 30.986 9.991a7.584 7.584 0 009.635-11.715c-13.51-11.112-29.547-13.445-40.619-13.445-29.274 0-42.607 15.722-42.607 30.329 0 7.45 2.729 17.611 15.728 23.72 7.813 3.671 17.605 5.171 27.074 6.624 21.954 3.367 29.749 6.161 29.749 15.151 0 9.071-10.829 15.164-26.942 15.164-16.496 0-29.068-6.689-35.092-10.678a7.584 7.584 0 00-10.508 2.138 7.582 7.582 0 002.138 10.508c12.854 8.513 28.289 13.201 43.457 13.201 29.089 0 42.108-15.234 42.108-30.329zm109.939 7.95a7.585 7.585 0 00-2.117-10.513 7.584 7.584 0 00-10.513 2.118c-6.494 9.774-17.362 15.607-29.068 15.607-20.904 0-37.911-17.006-37.911-37.91 0-20.904 17.007-37.91 37.911-37.91 11.708 0 22.574 5.833 29.068 15.607a7.582 7.582 0 0010.513 2.117 7.581 7.581 0 002.117-10.512c-9.312-14.014-24.902-22.38-41.698-22.38-29.267 0-53.077 23.81-53.077 53.078 0 29.267 23.81 53.077 53.077 53.077 16.798 0 32.386-8.366 41.698-22.379z"></path>
              </svg>
            </Link>
            <div className="description text-xl ">
              <ul className=" list-decimal m-4">
                <li>1+ years of Google Bard enhancements.</li>
                <li>500+ hours of billed work.</li>
              </ul>
            </div>
          </div>

          <div className="container rounded-md px-2 py-4 flex flex-col items-center md:flex-row md:justify-around md:max-w-1/2">
            <Link href="https://www.wordontheblock.com/">
              <Image src="/wotb.png" alt="wotb" width={200} height={400} />
            </Link>
            <div className="description text-xl ">
              <ul className=" list-decimal m-4">
                <li>2+ years of website enhancements.</li>
                <li>Integrated all of the OAuth Platforms</li>
                <li>Made Whitelisting feature for marketing.</li>
              </ul>
            </div>
          </div>
          <div className="container  rounded-md md:py-4 w-full flex flex-col items-center justify-around p-4 md:flex-row md:max-w-1/2">
            <Link href="https://wallstbible-premium.com/">
              <Image
                width={200}
                height={200}
                alt="bull-grey"
                src="/bull_grey_logo.svg"
                className="w-20 "
              />
            </Link>
            <div className="description text-xl  ">
              <ul className=" list-decimal m-4">
                <li>
                  <Balancer>
                    5+ years of expertise in Python and Node.js for bot<br></br>
                    development and web automation, crafting over 100 <br></br>{" "}
                    successful bots.
                  </Balancer>
                </li>
                <li> 2+ years of server management and maintanence</li>
                <li> Long term support for bots and enhancements.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* section 3 */}

      <div className="title font-ProtestRiot w-full h-full  p-4 md:pl-16 py-2 ">
        <div className="text-5xl md:text-8xl pt-4"> My services :</div>
        <br />
        <div className="text-4xl">
          <div className="service  py-4">
            <span className="text-pink-400 ">Next.js</span>: Full Stack Next.js
            App development.
          </div>
          <div className="service  py-4">
            <span className="text-pink-400">Web automation</span>: Automate your
            work on web.
          </div>
          <div className="service  py-4">
            <span className="text-pink-400">Bots</span>: Bots on almost all
            websites
            {"(ain't feel like mentioning them all)"}
          </div>
          <div className="service  py-4">
            <span className="text-pink-400">Consultancy</span>: I have googled
            some stuff for you. 😉
          </div>
        </div>
      </div>
    </>
  );
}
