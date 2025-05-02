import { Mail } from "lucide-react";
import HeaderTitle from "@/app/(landing)/components/header-title";
import ContactForm from "@/app/(landing)/components/contact-form";

const contactOptions = [
  {
    id: 1,
    icon: Mail,
    label: "info@embraceafrika.org",
    href: "mailto:info@embraceafrika.org",
  },
];

const ContactUsPage = () => {
  return (
    <>
      <div className={"flex w-full flex-col gap-5"}>
        <HeaderTitle
          url={"/contact"}
          title="For Any Queries"
          subtitle="Contact Us"
        />

        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 justify-center gap-5 p-2 py-5 md:grid-cols-3">
          {/* Contact Form */}
          <div className="md:col-span-2">
            <ContactForm />
          </div>

          {/* Contact Options */}
          <ul className="space-y-4">
            {contactOptions.map((option) => (
              <li key={option.id}>
                <a
                  href={option.href}
                  className="flex items-center gap-3 rounded-xl bg-muted p-3 duration-300 hover:bg-gold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="rounded-full bg-white p-5">
                    <option.icon className="h-8 w-8" />
                  </div>
                  <div className="font-heading text-lg">{option.label}</div>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Google Maps Embed */}
        <div className="w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255282.3239005571!2d36.68258277200201!3d-1.3032035601421934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi!5e0!3m2!1sen!2ske!4v1738720888521!5m2!1sen!2ske"
            height="450"
            className="w-full border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default ContactUsPage;
