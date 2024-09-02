'use client';

import { sendEmail } from '@/lib/actions/sendEmail';
import { cn, descOpacity } from '@/lib/utils';
import { useInView, motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import React, { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import RoundedBtn from './rounded';
import { useFormStatus } from 'react-dom';

const ContactSection = () => {
  const t = useTranslations('ContactPage');
  const locale = useLocale();
  const isArabic = locale === 'ar';

  const container = useRef(null);
  const isInView = useInView(container);

  const [isNameFilled, setIsNameFilled] = useState(false);
  const [isEmailFilled, setIsEmailFilled] = useState(false);
  const [isMessageFilled, setIsMessageFilled] = useState(false);

  const { pending } = useFormStatus();

  // Event handlers
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFilledState: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setFilledState(e.target.value !== '');
  };

  return (
    <div className="bg-[#141516]/95 min-h-screen py-32  m-0 contact-header ">
      <div className="container medium">
        <div className="row will-change-transform">
          <div
            className="flex-col border-b border-[#696443]/40"
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
          </div>
        </div>
        <div className="row will-change-transform">
          <div className="flex-col">
            <form
              action={async (formData) => {
                const { data, error } = await sendEmail(formData);

                if (error) {
                  toast.error(error);
                  return;
                }

                toast.success('Email sent successfully!');
              }}
              className="form"
            >
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
                  'group absolute top-[85%]  roundedBtnSize bg-[#00b0db] text-white rounded-full flex items-center justify-center cursor-pointer  mb-32',
                  isArabic
                    ? 'right-[calc(100%-200px)] md:right-[calc(100%-400px)] xl:right-[calc(100%-700px)]'
                    : 'left-[calc(100%-200px)] md:left-[calc(100%-400px)] xl:right-[calc(100%-700px)]'
                )}
              >
                <button
                  type="submit"
                  className="group flex items-center justify-center gap-2 h-[3rem] w-[8rem] bg-gray-900 text-white rounded-full outline-none transition-all focus:scale-110 hover:scale-110 hover:bg-gray-950 active:scale-105 dark:bg-white dark:bg-opacity-10 disabled:scale-100 disabled:bg-opacity-65 z-50"
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
          <div className="flex-col">
            <h5> {t('info')} </h5>
            <ul className="links-wrap"></ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
