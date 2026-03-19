"use client";

import Image from "next/image";

import {
  Marquee,
  MarqueeContent,
  MarqueeFade,
  MarqueeItem,
} from "@/components/ui/marquee";
import {
  Testimonial,
  TestimonialAuthor,
  TestimonialAuthorName,
  TestimonialAuthorTagline,
  TestimonialAvatar,
  TestimonialAvatarImg,
  TestimonialAvatarRing,
  TestimonialQuote,
  TestimonialVerifiedBadge,
} from "@/components/ui/testimonial";
import {
  FEATURED_TESTIMONIAL,
  TESTIMONIALS_ROW_ONE,
  TESTIMONIALS_ROW_TWO,
} from "@/constants/testimonials";
import type { Translation } from "@/translations";

import {
  SectionContainer,
  SectionContent,
  SectionFiller,
  SectionHelper,
} from "./section-layout";

interface TestimonialsProps {
  translation: Translation;
}

export function TestimonialsMarquee() {
  return (
    <div className="bg-background w-full space-y-4 [&_.rfm-initial-child-container]:items-stretch! [&_.rfm-marquee]:items-stretch!">
      {[TESTIMONIALS_ROW_ONE, TESTIMONIALS_ROW_TWO].map((list, index) => (
        <Marquee key={index} className="border-edge border-y">
          <MarqueeFade side="left" />
          <MarqueeFade side="right" />

          <MarqueeContent direction={index % 2 === 1 ? "right" : "left"}>
            {list.map((item) => (
              <MarqueeItem
                key={item.url}
                className="border-edge mx-0 h-full w-xs border-r"
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-accent/20 block h-full transition-[background-color] ease-out"
                >
                  <Testimonial>
                    <TestimonialQuote>
                      <p>{item.quote}</p>
                    </TestimonialQuote>

                    <TestimonialAuthor
                      className={
                        !item.authorTagline ? "grid-rows-1" : undefined
                      }
                    >
                      <TestimonialAvatar>
                        <TestimonialAvatarImg src={item.authorAvatar} />
                        <TestimonialAvatarRing />
                      </TestimonialAvatar>

                      <TestimonialAuthorName
                        className={
                          !item.authorTagline ? "flex items-center" : undefined
                        }
                      >
                        {item.authorName}
                        {item.authorTagline && <TestimonialVerifiedBadge />}
                      </TestimonialAuthorName>

                      {item.authorTagline && (
                        <TestimonialAuthorTagline>
                          {item.authorTagline}
                        </TestimonialAuthorTagline>
                      )}
                    </TestimonialAuthor>
                  </Testimonial>
                </a>
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      ))}
    </div>
  );
}

export const Testimonials = ({ translation }: TestimonialsProps) => (
  <>
    <SectionFiller />
    <SectionContainer>
      <SectionHelper>{translation.testimonials.sectionLabel}</SectionHelper>

      <SectionContent className="flex flex-col md:flex-row">
        <a
          href={FEATURED_TESTIMONIAL.url}
          target="_blank"
          rel="noopener noreferrer"
          className="border-fd-border hover:bg-accent/20 flex w-full flex-col justify-center p-8 transition-[background-color] ease-out md:w-2/5 md:border-r md:p-12"
        >
          <div className="text-fd-muted-foreground/40 mb-6 font-serif text-5xl">
            &ldquo;
          </div>
          <blockquote className="text-fd-foreground mb-8 text-xl leading-relaxed font-medium md:text-2xl">
            {FEATURED_TESTIMONIAL.quote}
          </blockquote>
          <div className="flex items-center gap-4">
            <div className="ring-fd-border relative size-12 shrink-0 overflow-hidden rounded-full ring-2">
              <Image
                src={FEATURED_TESTIMONIAL.authorAvatar}
                alt={FEATURED_TESTIMONIAL.authorName}
                width={48}
                height={48}
                className="size-full object-cover"
              />
            </div>
            <div
              className={
                FEATURED_TESTIMONIAL.authorTagline
                  ? undefined
                  : "flex flex-col justify-center"
              }
            >
              <p className="text-fd-foreground font-medium">
                {FEATURED_TESTIMONIAL.authorName}
              </p>
              {FEATURED_TESTIMONIAL.authorTagline && (
                <p className="text-fd-muted-foreground text-sm">
                  {FEATURED_TESTIMONIAL.authorTagline}
                </p>
              )}
            </div>
          </div>
        </a>

        <div className="flex w-full flex-col justify-center md:w-3/5">
          <TestimonialsMarquee />
        </div>
      </SectionContent>
    </SectionContainer>
  </>
);
