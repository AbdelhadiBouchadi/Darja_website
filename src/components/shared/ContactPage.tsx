'use client';

import { sendEmail } from '@/lib/actions/sendEmail';
import { cn, descOpacity } from '@/lib/utils';
import { useInView, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import RoundedBtn from './rounded';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';

const ContactSection = () => {
  const t = useTranslations('ContactPage');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  const container = useRef(null);
  const isInView = useInView(container);

  const [isNameFilled, setIsNameFilled] = useState(false);
  const [isEmailFilled, setIsEmailFilled] = useState(false);
  const [isMessageFilled, setIsMessageFilled] = useState(false);

  const [pending, setPending] = useState(false);

  // Event handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFilledState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setFilledState(e.target.value !== '');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior
    setPending(true);

    const formData = new FormData(e.currentTarget);

    try {
      const { data, error } = await sendEmail(formData);

      if (error) {
        toast.error(error);
        return;
      }

      toast.success(t('success'));
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="bg-[#141516]/95 min-h-screen py-32  m-0 contact-header ">
      <div className="container medium">
        <div className="row will-change-transform">
          <div
            className="flex-col border-b border-[#696443]/40 relative pb-24"
            ref={container}
          >
            <motion.h2
              variants={descOpacity}
              animate={isInView ? 'open' : 'closed'}
              className={`text-2xl md:text-6xl m-0 font-semibold text-start bg-clip-text py-6 text-transparent bg-gradient-to-b from-[#696443] to-[#696443]/40 ${
                isArabic ? 'arabic-title-bold' : 'latin-title-bold'
              }`}
            >
              {t('heading')}
            </motion.h2>
            <div
              className={`absolute top-[calc(100%-75px)] ${
                isArabic
                  ? 'right-[calc(100%-170px)] md:right-[calc(100%-250px)]'
                  : 'left-[calc(100%-170px)] md:left-[calc(100%-250px)]'
              }`}
            >
              <RoundedBtn className="roundedBtnSize bg-[#696443] text-white rounded-full absolute flex items-center justify-center overlay">
                <div className="globe">
                  <div className="globe-wrap">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle-hor"></div>
                    <div className="circle-hor-middle"></div>
                  </div>
                </div>
              </RoundedBtn>
            </div>
          </div>
        </div>
        <div className="row will-change-transform">
          <div className="flex-col order-2 md:order-1">
            <form onSubmit={handleSubmit} className="form">
              <div
                className={`form-col ${isNameFilled ? 'not-empty' : ''} ${
                  isArabic ? 'arabic-text-bold' : 'latin-text-bold'
                }`}
              >
                <h5>01</h5>
                <label htmlFor="senderName" className="label">
                  {' '}
                  {t('ContactForm.name')}{' '}
                </label>
                <input
                  type="text"
                  className="field font-normal"
                  id="form-name"
                  name="senderName"
                  required
                  placeholder={t('ContactForm.namePlaceholder')}
                  onChange={(e) => handleInputChange(e, setIsNameFilled)}
                />
              </div>
              <div
                className={`form-col ${isEmailFilled ? 'not-empty' : ''} ${
                  isArabic ? 'arabic-text-bold' : 'latin-text-bold'
                }`}
              >
                <h5>02</h5>
                <label htmlFor="senderEmail" className="label">
                  {' '}
                  {t('ContactForm.email')}{' '}
                </label>
                <input
                  type="email"
                  className="field font-normal"
                  id="form-email"
                  name="senderEmail"
                  required
                  placeholder="exemple@email.com"
                  onChange={(e) => handleInputChange(e, setIsEmailFilled)}
                />
              </div>
              <div
                className={`form-col ${isMessageFilled ? 'not-empty' : ''} ${
                  isArabic ? 'arabic-text-bold' : 'latin-text-bold'
                }`}
              >
                <h5>03</h5>
                <label htmlFor="message" className="label">
                  {' '}
                  {t('ContactForm.message')}{' '}
                </label>
                <textarea
                  name="message"
                  maxLength={5000}
                  rows={8}
                  id="form-message"
                  className="field font-normal"
                  required
                  placeholder={t('ContactForm.messagePlaceholder')}
                  onChange={(e) => handleInputChange(e, setIsMessageFilled)}
                />
              </div>
              <RoundedBtn
                className={cn(
                  'group absolute top-[90%]  roundedBtnSize bg-[#00b0db] text-white rounded-full flex items-center justify-center cursor-pointer  mb-32',
                  isArabic
                    ? 'right-[calc(100%-200px)] md:right-[calc(100%-700px)] '
                    : 'left-[calc(100%-200px)] md:left-[calc(100%-700px)] '
                )}
              >
                <button
                  type="submit"
                  className="w-full h-full flex items-center justify-center z-50"
                  disabled={pending}
                >
                  {pending ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                  ) : (
                    t('submitBtn')
                  )}
                </button>
              </RoundedBtn>
            </form>
          </div>
          <div
            className={cn(
              'flex-col pt-[1.66em] text-white order-1 md:order-2',
              isArabic ? 'arabic-subtitle-regular' : 'latin-subtitle-regular'
            )}
          >
            <h5 className={cn('opacity-30 ', isArabic ? 'text-2xl' : '')}>
              {' '}
              {t('info')}{' '}
            </h5>
            <ul className="links-wrap">
              <li>
                <Link
                  href="mailto:administration@espacedarja.com"
                  target="_blank"
                  dir="ltr"
                >
                  administration@espacedarja.com
                </Link>
              </li>
              <li>
                <Link href="tel:+212522274448" target="_blank" dir="ltr">
                  05 22 27 44 48
                </Link>
              </li>
            </ul>

            <h5 className={cn('opacity-30 ', isArabic ? 'text-2xl' : '')}>
              {' '}
              {t('contact')}{' '}
            </h5>
            <ul className="links-wrap">
              <li>
                <p dir="ltr">Mers Sultan, Casablanca</p>
              </li>
              <li>
                <p dir="ltr">113 Avenue Mers Sultan</p>
              </li>
              <li>
                <p dir="ltr">6ème étage</p>
              </li>
              <li>
                <p dir="ltr">Appt. 12</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
