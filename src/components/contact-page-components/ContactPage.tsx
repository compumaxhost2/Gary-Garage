"use client";

import { useState } from "react";
import { business, services } from "@/data/site";
import { useFaqSchema } from "@/lib/seo";
import {
  CheckIcon,
  InfoIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/shared-ui/Icons";
import { CallButton, Eyebrow, FaqAccordion, PageHeader } from "@/components/shared-ui/ui";

const contactFaqs = [
  {
    q: "What is the fastest way to reach the business?",
    a: "Calling 862-290-4278 is the most direct route. Describe the door or shutter, the property, and what you need, and the next step can be discussed.",
  },
  {
    q: "Which areas are covered?",
    a: "Gary Miller Garage Door Service is based in New Jersey. Coverage depends on your location, so call to confirm availability in your area before planning any work.",
  },
  {
    q: "When is the team available?",
    a: "Call 862-290-4278 to reach the team. Current availability and scheduling are confirmed when you speak with us.",
  },
  {
    q: "How does the service request form work?",
    a: "Submitting the form opens WhatsApp with a formatted message containing your details. Review it and tap Send in WhatsApp. This website does not store your information.",
  },
];

export default function Contact() {
  useFaqSchema(contactFaqs, "contact");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    property: "Residential",
    service: services[0].name,
    location: "",
    message: "",
  });
  const update = (field: keyof typeof form) => (value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submitRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const details = [
      form.name.trim() && `👤 *Name:* ${form.name.trim()}`,
      form.phone.trim() && `📞 *Phone:* ${form.phone.trim()}`,
      `🏠 *Property:* ${form.property}`,
      `🔧 *Service:* ${form.service}`,
      form.location.trim() && `📍 *Location:* ${form.location.trim()}`,
      form.message.trim() && `📝 *Details:* ${form.message.trim()}`,
    ].filter((detail): detail is string => Boolean(detail));
    const message = [
      `👋 *New service request for ${business.name}*`,
      "",
      ...details,
    ].join("\n");

    window.location.assign(
      `https://wa.me/${business.whatsappPhone}?text=${encodeURIComponent(message)}`,
    );
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Tell us about the door."
        intro="Calling is the most direct way to reach Gary Miller Garage Door Service. Describe the property, the door or opening, and what you have noticed — the relevant next step can be discussed from there."
        trail={[{ label: "Home", to: "/" }, { label: "Contact" }]}
        actions={false}
      />

      <section className="bg-white py-12 sm:py-14 lg:py-16">
        <div className="shell grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
          <div className="space-y-4">
            <div className="rounded-[4px] bg-navy p-6 text-white sm:p-7">
              <Eyebrow light>Call directly</Eyebrow>
              <a
                href={business.phoneHref}
                className="mt-3 flex items-center gap-3 font-display text-[clamp(1.8rem,4vw,2.5rem)] font-extrabold tracking-[-0.02em] text-white transition-colors hover:text-[#ffd7de]"
                aria-label={`Call ${business.name} on ${business.phoneDisplay}`}
              >
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-white/25">
                  <PhoneIcon size={20} />
                </span>
                {business.phoneDisplay}
              </a>
              <p className="mt-3 text-[0.9rem] leading-relaxed text-[#c9d6ea]">
                Describe the door or shutter, what it is doing, and where the property is located.
                You do not need to know the part name to start.
              </p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                <CallButton className="btn btn-primary w-full sm:w-auto" />
                <span className="flex min-h-[42px] flex-1 items-center justify-center gap-2 rounded-[3px] border border-white/20 px-3 text-center text-[0.7rem] font-semibold uppercase tracking-[0.06em] text-[#c9d6ea]">
                  <MapPinIcon size={14} />
                  {business.areaServed} coverage
                </span>
              </div>
            </div>

            <div className="rounded-[4px] border border-line bg-white p-5 sm:p-6">
              <h2 className="text-[1.02rem] font-bold text-navy">What to have ready</h2>
              <ul className="mt-3 space-y-2.5">
                {[
                  "The door or shutter type, and the property",
                  "What it is doing — noise, movement, damage, or sticking",
                  "The installation or replacement you are planning",
                  "Your location, so coverage can be confirmed",
                  "Photos of the door or hardware, if you have them",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-[0.86rem] leading-relaxed text-ink">
                    <CheckIcon size={15} className="mt-[3px] flex-none text-red" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[4px] border border-line bg-mist p-5 sm:p-6">
              <div className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-blue">
                <MapPinIcon size={15} />
                Service area
              </div>
              <p className="mt-2 text-[0.86rem] leading-relaxed text-ink">
                {business.areaServed}. {business.areaNote}
              </p>
              <p className="mt-2 text-[0.8rem] leading-relaxed text-muted">
                Current availability and scheduling are confirmed when you call.
              </p>
            </div>

            <div className="rounded-[4px] border border-line bg-white p-5 text-[0.8rem] leading-relaxed text-muted sm:p-6">
              <div className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-blue">
                <InfoIcon size={15} />
                Contact details
              </div>
              <p className="mt-2">
                Address: {business.address}. Call to confirm service availability and scheduling.
              </p>
            </div>
          </div>

          <div id="request-form" className="scroll-mt-24 rounded-[4px] border border-line bg-white p-5 sm:p-7">
            <Eyebrow>Request service</Eyebrow>
            <h2 className="mt-3 text-[1.5rem] font-extrabold leading-tight tracking-[-0.025em] text-navy sm:text-[1.75rem]">
              Send your details on WhatsApp.
            </h2>
            <div className="mt-4 flex items-start gap-2.5 rounded-[3px] border border-[#c9d9ee] bg-[#f2f7fd] p-3.5">
              <InfoIcon size={16} className="mt-[2px] flex-none text-blue" />
              <p className="text-[0.8rem] leading-relaxed text-[#2b4362]">
                Submitting opens WhatsApp with a formatted message containing your details. Review
                the message and tap Send in WhatsApp; this website does not store your information.
              </p>
            </div>

            <form
              className="mt-5 grid gap-4 sm:grid-cols-2"
              onSubmit={submitRequest}
            >
              <div>
                <label className="field-label" htmlFor="contact-name">
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="field"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(event) => update("name")(event.target.value)}
                />
              </div>
              <div>
                <label className="field-label" htmlFor="contact-phone">
                  Phone
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                  className="field"
                  placeholder="Your phone number"
                  value={form.phone}
                  onChange={(event) => update("phone")(event.target.value)}
                />
              </div>
              <div>
                <label className="field-label" htmlFor="contact-property">
                  Property type
                </label>
                <select
                  id="contact-property"
                  name="property"
                  className="field"
                  value={form.property}
                  onChange={(event) => update("property")(event.target.value)}
                >
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Other / not sure</option>
                </select>
              </div>
              <div>
                <label className="field-label" htmlFor="contact-service">
                  Service
                </label>
                <select
                  id="contact-service"
                  name="service"
                  className="field"
                  value={form.service}
                  onChange={(event) => update("service")(event.target.value)}
                >
                  {services.map((service) => (
                    <option key={service.slug} value={service.name}>
                      {service.name}
                    </option>
                  ))}
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className="field-label" htmlFor="contact-location">
                  Location <span className="font-normal text-muted">(city, state, or ZIP — optional)</span>
                </label>
                <input
                  id="contact-location"
                  name="location"
                  type="text"
                  autoComplete="address-level2"
                  className="field"
                  placeholder="Needed to confirm coverage"
                  value={form.location}
                  onChange={(event) => update("location")(event.target.value)}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="field-label" htmlFor="contact-message">
                  What is happening with the door?
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  className="field resize-y"
                  placeholder="For example: the door is noisy and stops halfway up; or: I would like to discuss a replacement door."
                  value={form.message}
                  onChange={(event) => update("message")(event.target.value)}
                />
              </div>

              <div className="sm:col-span-2 flex flex-col gap-2.5 sm:flex-row">
                <button type="submit" className="btn btn-navy sm:flex-1">
                  <WhatsAppIcon size={17} />
                  Submit
                </button>
                <a
                  href={business.phoneHref}
                  className="btn btn-primary sm:flex-1"
                  aria-label={`Call ${business.name} on ${business.phoneDisplay}`}
                >
                  <PhoneIcon size={17} />
                  Call {business.phoneDisplay}
                </a>
              </div>
            </form>

          </div>
        </div>
      </section>

      <section className="border-t border-line bg-mist py-14 sm:py-16">
        <div className="shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow>Contact questions</Eyebrow>
            <h2 className="h-section mt-3">Before you get in touch.</h2>
            <p className="lede mt-4">
              Quick answers about reaching the business, coverage, and sending your service request.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <CallButton />
              <button
                type="button"
                className="btn btn-outline"
                onClick={() =>
                  document.getElementById("request-form")?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
              >
                Back to the request form
              </button>
            </div>
          </div>
          <FaqAccordion items={contactFaqs} idPrefix="contact" />
        </div>
      </section>
    </>
  );
}
