document.addEventListener('DOMContentLoaded', () => {
    // Prevent running on pages that do not have BGA elements
    if (!document.getElementById('bga-intro')) return;

    // --- QUESTION BANK DATA ---
    const quizData = [
        // Section 1: PROFILE (7 Questions) - Custom Form UI
        {
            section: "PROFILE",
            sectionNum: 1,
            question: "Let's start with your business profile.",
            type: "profile",
            fieldName: "businessName",
            label: "Business Name",
            inputType: "text",
            required: true,
            placeholder: "Enter your business name"
        },
        {
            section: "PROFILE",
            sectionNum: 1,
            question: "What industry does your business operate in?",
            type: "profile",
            fieldName: "industry",
            label: "Industry",
            inputType: "select",
            required: true,
            options: [
                "Technology", "Healthcare", "Education", "Real Estate", 
                "Food & Beverage", "Fashion & Beauty", "Finance", "Retail", 
                "Agriculture", "Media & Entertainment", "Consulting", 
                "Construction", "Transportation", "Other"
            ]
        },
        {
            section: "PROFILE",
            sectionNum: 1,
            question: "Where is your business located?",
            type: "profile",
            fieldName: "location",
            label: "Business Location",
            inputType: "text",
            required: true,
            placeholder: "City, Country (e.g., Lagos, Nigeria)"
        },
        {
            section: "PROFILE",
            sectionNum: 1,
            question: "How long has your business been operating?",
            type: "profile",
            fieldName: "yearsInBusiness",
            label: "Years in Business",
            inputType: "select",
            required: true,
            options: ["Less than 1", "1-2", "3-5", "6-10", "10+"]
        },
        {
            section: "PROFILE",
            sectionNum: 1,
            question: "How many employees are in your team?",
            type: "profile",
            fieldName: "employeesCount",
            label: "Number of Employees",
            inputType: "select",
            required: true,
            options: ["Just me", "2-5", "6-10", "11-25", "26-50", "50+"]
        },
        {
            section: "PROFILE",
            sectionNum: 1,
            question: "Do you have an existing business website URL?",
            type: "profile",
            fieldName: "websiteUrl",
            label: "Business Website (Optional)",
            inputType: "url",
            required: false,
            placeholder: "https://yourwebsite.com"
        },
        {
            section: "PROFILE",
            sectionNum: 1,
            question: "Which social media platforms are your primary presence?",
            type: "profile",
            fieldName: "socialPlatforms",
            label: "Primary Social Media Platforms (Select all that apply)",
            inputType: "checkboxes",
            required: false,
            options: ["Instagram", "Facebook", "Twitter/X", "LinkedIn", "TikTok", "YouTube", "None"]
        },

        // Section 2: DISCOVERABILITY (6 Questions)
        {
            section: "DISCOVERABILITY",
            sectionNum: 2,
            question: "Do you have a Google Business Profile setup?",
            type: "radio",
            options: [
                { text: "Yes, fully optimized and verified", points: 25, isMissing: false, fact: "Google Business Profile configured" },
                { text: "Yes, but not optimized/incomplete", points: 12, isMissing: true, fact: "Google Business Profile is incomplete" },
                { text: "No, or I don't know", points: 0, isMissing: true, fact: "Missing: Google Business Profile" }
            ]
        },
        {
            section: "DISCOVERABILITY",
            sectionNum: 2,
            question: "Does your business show up on Google Maps when searched?",
            type: "radio",
            options: [
                { text: "Yes, easily visible with active navigation details", points: 25, isMissing: false, fact: "Visible on Google Maps" },
                { text: "Sometimes/Only with exact name search", points: 12, isMissing: true, fact: "Google Maps visibility is limited" },
                { text: "No, or I don't know", points: 0, isMissing: true, fact: "Missing: Google Maps presence" }
            ]
        },
        {
            section: "DISCOVERABILITY",
            sectionNum: 2,
            question: "Can local customers easily find your services when searching keywords on Google?",
            type: "radio",
            options: [
                { text: "Yes, we rank on the first page", points: 25, isMissing: false, fact: "First-page Google rankings" },
                { text: "Somewhat, we appear down the page", points: 12, isMissing: true, fact: "Low visibility on keyword searches" },
                { text: "No, we do not appear in searches", points: 0, isMissing: true, fact: "Missing: Search engine visibility" }
            ]
        },
        {
            section: "DISCOVERABILITY",
            sectionNum: 2,
            question: "Are your contact details (phone, email, address) consistent across all online platforms?",
            type: "radio",
            options: [
                { text: "Yes, 100% consistent everywhere", points: 25, isMissing: false, fact: "Consistent online directory details" },
                { text: "Mostly, but there are some discrepancies", points: 12, isMissing: true, fact: "Inconsistent directory details" },
                { text: "No, details are outdated or missing", points: 0, isMissing: true, fact: "Missing: Directory NAP consistency" }
            ]
        },
        {
            section: "DISCOVERABILITY",
            sectionNum: 2,
            question: "Do you actively receive and reply to Google reviews?",
            type: "radio",
            options: [
                { text: "Yes, regularly receive and respond to them", points: 25, isMissing: false, fact: "Active Google reviews collection" },
                { text: "We have a few, but rarely get new ones or reply", points: 12, isMissing: true, fact: "Rarely receive/reply to Google reviews" },
                { text: "No reviews or no profile", points: 0, isMissing: true, fact: "Missing: Google reviews strategy" }
            ]
        },
        {
            section: "DISCOVERABILITY",
            sectionNum: 2,
            question: "Is your business listed in local online directories or industry maps?",
            type: "radio",
            options: [
                { text: "Yes, listed on multiple major directories", points: 25, isMissing: false, fact: "Listed in online directories" },
                { text: "Only listed in 1 or 2 basic directories", points: 12, isMissing: true, fact: "Incomplete business directory presence" },
                { text: "No directory listings", points: 0, isMissing: true, fact: "Missing: Local directory listings" }
            ]
        },

        // Section 3: WEBSITE & FIRST IMPRESSION (7 Questions)
        {
            section: "WEBSITE",
            sectionNum: 3,
            question: "Do you have a dedicated business website?",
            type: "radio",
            options: [
                { text: "Yes, custom-built and modern", points: 25, isMissing: false, fact: "Professional custom website" },
                { text: "Yes, but outdated or DIY-looking", points: 12, isMissing: true, fact: "Website is outdated or DIY style" },
                { text: "No website", points: 0, isMissing: true, fact: "Missing: Business website" }
            ]
        },
        {
            section: "WEBSITE",
            sectionNum: 3,
            question: "Is your website fully responsive and mobile-friendly?",
            type: "radio",
            options: [
                { text: "Yes, looks and works perfectly on mobile", points: 25, isMissing: false, fact: "Mobile-responsive website" },
                { text: "Partially, some pages look broken or hard to use", points: 12, isMissing: true, fact: "Partially mobile-friendly website" },
                { text: "No, or I don't have a website", points: 0, isMissing: true, fact: "Missing: Mobile-responsive website" }
            ]
        },
        {
            section: "WEBSITE",
            sectionNum: 3,
            question: "Does your website load quickly (under 3 seconds)?",
            type: "radio",
            options: [
                { text: "Yes, very fast load times", points: 25, isMissing: false, fact: "Fast website speed" },
                { text: "Okay, but takes 4-7 seconds to fully render", points: 12, isMissing: true, fact: "Slow website load speeds" },
                { text: "Very slow (8+ seconds) or no website", points: 0, isMissing: true, fact: "Missing: Fast loading speed" }
            ]
        },
        {
            section: "WEBSITE",
            sectionNum: 3,
            question: "Are your core services or products clearly explained on the homepage?",
            type: "radio",
            options: [
                { text: "Yes, visitors know exactly what we offer in 5 seconds", points: 25, isMissing: false, fact: "Clear service explanations" },
                { text: "Somewhat, but requires reading down the page", points: 12, isMissing: true, fact: "Unclear primary service messaging" },
                { text: "No, it is confusing or we have no website", points: 0, isMissing: true, fact: "Missing: Clear value communication on home" }
            ]
        },
        {
            section: "WEBSITE",
            sectionNum: 3,
            question: "Is your business contact information easy to find on the website?",
            type: "radio",
            options: [
                { text: "Yes, visible in header, footer, and contact page", points: 25, isMissing: false, fact: "Accessible contact information" },
                { text: "Hidden, takes a few clicks to locate", points: 12, isMissing: true, fact: "Hard-to-find contact details" },
                { text: "No contact info displayed or no website", points: 0, isMissing: true, fact: "Missing: Easy contact accessibility" }
            ]
        },
        {
            section: "WEBSITE",
            sectionNum: 3,
            question: "Do you have a clear primary Call-To-Action (CTA) on your website?",
            type: "radio",
            options: [
                { text: "Yes, high-contrast button like 'Book Now' or 'Get Quote'", points: 25, isMissing: false, fact: "Optimized Call-to-Action buttons" },
                { text: "Yes, but it is small, hidden, or unclear", points: 12, isMissing: true, fact: "Weak website CTAs" },
                { text: "No CTA or no website", points: 0, isMissing: true, fact: "Missing: Clear Call-to-Action setup" }
            ]
        },
        {
            section: "WEBSITE",
            sectionNum: 3,
            question: "Would you describe your website design as clean, professional, and trustworthy?",
            type: "radio",
            options: [
                { text: "Yes, looks premium and modern", points: 25, isMissing: false, fact: "Premium, modern site design" },
                { text: "It is dated or looks standard/generic", points: 12, isMissing: true, fact: "Dated or generic site styling" },
                { text: "Poor design quality or no website", points: 0, isMissing: true, fact: "Missing: Professional design aesthetics" }
            ]
        },

        // Section 4: POSITIONING (5 Questions)
        {
            section: "POSITIONING",
            sectionNum: 4,
            question: "Can you clearly explain what makes your business different from competitors?",
            type: "radio",
            options: [
                { text: "Yes, we have a unique value proposition", points: 25, isMissing: false, fact: "Strong unique value proposition" },
                { text: "Vaguely, we claim to offer 'better service'", points: 12, isMissing: true, fact: "Generic competitor differentiation" },
                { text: "No, we offer the same things at similar prices", points: 0, isMissing: true, fact: "Missing: Clear positioning differentiation" }
            ]
        },
        {
            section: "POSITIONING",
            sectionNum: 4,
            question: "Is your visual branding (logo, colors, typography) consistent across all materials?",
            type: "radio",
            options: [
                { text: "Yes, completely consistent everywhere", points: 25, isMissing: false, fact: "Consistent brand visual identity" },
                { text: "Mostly, but variations exist on some channels", points: 12, isMissing: true, fact: "Inconsistent brand styling" },
                { text: "No, logo and colors vary randomly", points: 0, isMissing: true, fact: "Missing: Visual brand guidelines" }
            ]
        },
        {
            section: "POSITIONING",
            sectionNum: 4,
            question: "Is your pricing structure clearly presented or explained to potential customers?",
            type: "radio",
            options: [
                { text: "Yes, transparent pricing or clear packages", points: 25, isMissing: false, fact: "Transparent pricing details" },
                { text: "Hidden, they must request a custom quote", points: 12, isMissing: true, fact: "Opaque or request-only pricing" },
                { text: "No clear pricing details available", points: 0, isMissing: true, fact: "Missing: Price clarity or package structure" }
            ]
        },
        {
            section: "POSITIONING",
            sectionNum: 4,
            question: "Does your online presence communicate the exact value you deliver?",
            type: "radio",
            options: [
                { text: "Yes, website focus is entirely on client outcomes", points: 25, isMissing: false, fact: "Outcome-focused messaging" },
                { text: "Somewhat, it focuses on our features and history", points: 12, isMissing: true, fact: "Feature-centric business messaging" },
                { text: "No, it is just a basic contact list", points: 0, isMissing: true, fact: "Missing: Value-oriented messaging" }
            ]
        },
        {
            section: "POSITIONING",
            sectionNum: 4,
            question: "Do customers instantly understand exactly what your business does?",
            type: "radio",
            options: [
                { text: "Yes, it is immediately obvious", points: 25, isMissing: false, fact: "Clear business definition" },
                { text: "Sometimes, they occasionally ask for clarification", points: 12, isMissing: true, fact: "Vague service classification" },
                { text: "No, we often have to explain in detail", points: 0, isMissing: true, fact: "Missing: Rapid business comprehension" }
            ]
        },

        // Section 5: SOCIAL PROOF (5 Questions)
        {
            section: "SOCIAL_PROOF",
            sectionNum: 5,
            question: "Do you display client testimonials on your homepage or landing pages?",
            type: "radio",
            options: [
                { text: "Yes, premium text and video testimonials", points: 25, isMissing: false, fact: "Rich customer testimonials" },
                { text: "Yes, but they are generic text without names/photos", points: 12, isMissing: true, fact: "Anonymous/weak testimonials" },
                { text: "No testimonials displayed", points: 0, isMissing: true, fact: "Missing: Client testimonials" }
            ]
        },
        {
            section: "SOCIAL_PROOF",
            sectionNum: 5,
            question: "Do you show real customer reviews from Google, Trustpilot, or Facebook?",
            type: "radio",
            options: [
                { text: "Yes, live review widgets or verified badges", points: 25, isMissing: false, fact: "Verified reviews display" },
                { text: "We have listed a few static quotes", points: 12, isMissing: true, fact: "Static review highlights" },
                { text: "No reviews displayed", points: 0, isMissing: true, fact: "Missing: Verified social proof reviews" }
            ]
        },
        {
            section: "SOCIAL_PROOF",
            sectionNum: 5,
            question: "Do you showcase a portfolio of recent projects or case studies?",
            type: "radio",
            options: [
                { text: "Yes, deep case studies with real results", points: 25, isMissing: false, fact: "Detailed project case studies" },
                { text: "Yes, but just static images without context", points: 12, isMissing: true, fact: "Context-free project gallery" },
                { text: "No portfolio shown", points: 0, isMissing: true, fact: "Missing: Project work showcase" }
            ]
        },
        {
            section: "SOCIAL_PROOF",
            sectionNum: 5,
            question: "Do you display before-and-after work examples if applicable to your industry?",
            type: "radio",
            options: [
                { text: "Yes, clear visual transformations", points: 25, isMissing: false, fact: "Before/after visual proof" },
                { text: "We have generic descriptions of improvements", points: 12, isMissing: true, fact: "Abstract transformation statements" },
                { text: "No before-and-after displays", points: 0, isMissing: true, fact: "Missing: Visual transformation proof" }
            ]
        },
        {
            section: "SOCIAL_PROOF",
            sectionNum: 5,
            question: "Do you feature client logos, badges, or success metrics prominently?",
            type: "radio",
            options: [
                { text: "Yes, prominent logo grids or key stats (e.g., '10k+ users')", points: 25, isMissing: false, fact: "Trust badges & brand logos" },
                { text: "Yes, but they are hidden or hard to see", points: 12, isMissing: true, fact: "Inconspicuous trust markers" },
                { text: "No client logos or stats displayed", points: 0, isMissing: true, fact: "Missing: Trust badges and logos" }
            ]
        },

        // Section 6: SOCIAL MEDIA PRESENCE (5 Questions)
        {
            section: "SOCIAL_MEDIA",
            sectionNum: 6,
            question: "On how many social media platforms is your business active?",
            type: "radio",
            options: [
                { text: "Multiple (3+) platforms with updated content", points: 25, isMissing: false, fact: "Multi-channel social presence" },
                { text: "Only active on 1-2 platforms", points: 12, isMissing: true, fact: "Limited platform footprint" },
                { text: "No active social media platforms", points: 0, isMissing: true, fact: "Missing: Social media footprint" }
            ]
        },
        {
            section: "SOCIAL_MEDIA",
            sectionNum: 6,
            question: "What is your typical posting frequency on social media?",
            type: "radio",
            options: [
                { text: "Regularly (3+ times a week)", points: 25, isMissing: false, fact: "Consistent social posting" },
                { text: "Occasionally (1-4 times a month)", points: 12, isMissing: true, fact: "Sporadic social media updates" },
                { text: "Never or very rarely", points: 0, isMissing: true, fact: "Missing: Social content cadence" }
            ]
        },
        {
            section: "SOCIAL_MEDIA",
            sectionNum: 6,
            question: "How is your typical customer engagement (likes, comments, messages) on social media?",
            type: "radio",
            options: [
                { text: "High engagement, active discussions", points: 25, isMissing: false, fact: "High customer social engagement" },
                { text: "Some engagement, but mostly quiet", points: 12, isMissing: true, fact: "Low social media engagement" },
                { text: "Virtually zero engagement or inactive", points: 0, isMissing: true, fact: "Missing: Social community engagement" }
            ]
        },
        {
            section: "SOCIAL_MEDIA",
            sectionNum: 6,
            question: "Is your social media branding consistent with your website design?",
            type: "radio",
            options: [
                { text: "Yes, perfectly matched banners, logos, and style", points: 25, isMissing: false, fact: "Unified website & social design" },
                { text: "Mostly, but some channels use old designs", points: 12, isMissing: true, fact: "Disconnected channel styling" },
                { text: "No connection or no profiles", points: 0, isMissing: true, fact: "Missing: Brand styling alignment" }
            ]
        },
        {
            section: "SOCIAL_MEDIA",
            sectionNum: 6,
            question: "Do your social media posts actively educate and guide users to convert?",
            type: "radio",
            options: [
                { text: "Yes, balanced mix of educational posts & clear offers", points: 25, isMissing: false, fact: "Value & conversion content mix" },
                { text: "Sometimes, but we mostly post company updates", points: 12, isMissing: true, fact: "Internal-focused social content" },
                { text: "No, we just post random pictures or nothing", points: 0, isMissing: true, fact: "Missing: Conversion-oriented content" }
            ]
        },

        // Section 7: LEAD CAPTURE & CONVERSION (7 Questions)
        {
            section: "LEAD_CAPTURE",
            sectionNum: 7,
            question: "How many clicks does it take for a visitor to contact you or start an inquiry?",
            type: "radio",
            options: [
                { text: "One click directly from the homepage", points: 25, isMissing: false, fact: "One-click contact option" },
                { text: "Takes a few clicks through subpages", points: 12, isMissing: true, fact: "Multi-click inquiry path" },
                { text: "Difficult to find contact routes", points: 0, isMissing: true, fact: "Missing: Clear contact accessibility" }
            ]
        },
        {
            section: "LEAD_CAPTURE",
            sectionNum: 7,
            question: "Do you collect customer email addresses on your website?",
            type: "radio",
            options: [
                { text: "Yes, automated newsletter signups or downloads", points: 25, isMissing: false, fact: "Active email list building" },
                { text: "Only if they fill a contact form", points: 12, isMissing: true, fact: "Passive email collection" },
                { text: "No email list collection", points: 0, isMissing: true, fact: "Missing: Email newsletter capture" }
            ]
        },
        {
            section: "LEAD_CAPTURE",
            sectionNum: 7,
            question: "Is online booking or scheduling directly available for customers?",
            type: "radio",
            options: [
                { text: "Yes, integrated booking calendar (Calendly, etc.)", points: 25, isMissing: false, fact: "Integrated self-service booking" },
                { text: "Only via WhatsApp chat", points: 12, isMissing: true, fact: "Chat-based manual booking" },
                { text: "No online booking/must call", points: 0, isMissing: true, fact: "Missing: Digital booking capabilities" }
            ]
        },
        {
            section: "LEAD_CAPTURE",
            sectionNum: 7,
            question: "Do you utilize a specialized WhatsApp Business profile for support?",
            type: "radio",
            options: [
                { text: "Yes, configured with catalogs, hours, and replies", points: 25, isMissing: false, fact: "Configured WhatsApp Business profile" },
                { text: "We use a regular WhatsApp account", points: 12, isMissing: true, fact: "Standard WhatsApp personal profile" },
                { text: "No WhatsApp contact channel", points: 0, isMissing: true, fact: "Missing: WhatsApp communication channel" }
            ]
        },
        {
            section: "LEAD_CAPTURE",
            sectionNum: 7,
            question: "Do you offer any lead magnets (free guides, checklists, or audits)?",
            type: "radio",
            options: [
                { text: "Yes, highly relevant resources to capture leads", points: 25, isMissing: false, fact: "Lead magnet assets deployed" },
                { text: "Yes, but they are outdated or generic", points: 12, isMissing: true, fact: "Ineffective lead magnets" },
                { text: "No lead magnets offered", points: 0, isMissing: true, fact: "Missing: Value-first lead magnets" }
            ]
        },
        {
            section: "LEAD_CAPTURE",
            sectionNum: 7,
            question: "Do you have automated follow-ups set up for new leads?",
            type: "radio",
            options: [
                { text: "Yes, instant email or SMS autoresponders", points: 25, isMissing: false, fact: "Automated lead follow-up flows" },
                { text: "Only manual follow-up when we check email", points: 12, isMissing: true, fact: "Manual follow-up execution" },
                { text: "No follow-up strategy", points: 0, isMissing: true, fact: "Missing: Structured lead follow-up" }
            ]
        },
        {
            section: "LEAD_CAPTURE",
            sectionNum: 7,
            question: "Is there a clear, step-by-step customer journey defined for buyers?",
            type: "radio",
            options: [
                { text: "Yes, step 1, 2, 3 process is mapped out for them", points: 25, isMissing: false, fact: "Mapped client journey design" },
                { text: "Vaguely, they just click contact and hope for the best", points: 12, isMissing: true, fact: "Vague buyer conversion steps" },
                { text: "No defined customer path", points: 0, isMissing: true, fact: "Missing: Structured conversion journey" }
            ]
        },

        // Section 8: RETENTION & REFERRAL (4 Questions)
        {
            section: "RETENTION",
            sectionNum: 8,
            question: "Do you follow up with customers after a sale is completed?",
            type: "radio",
            options: [
                { text: "Yes, systematic survey or check-in within 30 days", points: 25, isMissing: false, fact: "Systematic post-sale checks" },
                { text: "Sometimes, if it is a major contract", points: 12, isMissing: true, fact: "Inconsistent post-sale check-ins" },
                { text: "No post-sale follow-up", points: 0, isMissing: true, fact: "Missing: Client check-in sequence" }
            ]
        },
        {
            section: "RETENTION",
            sectionNum: 8,
            question: "Do you actively ask satisfied customers for reviews or referrals?",
            type: "radio",
            options: [
                { text: "Yes, automated or standard request template", points: 25, isMissing: false, fact: "Structured referral system" },
                { text: "Rarely, only if they mention being happy", points: 12, isMissing: true, fact: "Occasional review requests" },
                { text: "No referral requests", points: 0, isMissing: true, fact: "Missing: Proactive referral prompts" }
            ]
        },
        {
            section: "RETENTION",
            sectionNum: 8,
            question: "Do you have a reward or loyalty mechanism for repeat business?",
            type: "radio",
            options: [
                { text: "Yes, discount programs, points, or gifts", points: 25, isMissing: false, fact: "Configured loyalty incentives" },
                { text: "Small informal discounts occasionally", points: 12, isMissing: true, fact: "Informal discount practices" },
                { text: "No loyalty benefits", points: 0, isMissing: true, fact: "Missing: Loyalty and repeat rewards" }
            ]
        },
        {
            section: "RETENTION",
            sectionNum: 8,
            question: "How regularly do you communicate value to past clients (newsletter, updates)?",
            type: "radio",
            options: [
                { text: "Monthly or weekly educational updates", points: 25, isMissing: false, fact: "Frequent customer communication" },
                { text: "Occasional holiday wishes or sales announcements", points: 12, isMissing: true, fact: "Promo-only client updates" },
                { text: "No regular communication", points: 0, isMissing: true, fact: "Missing: Customer engagement newsletter" }
            ]
        },

        // Section 9: LEGAL & TRUST SIGNALS (4 Questions)
        {
            section: "LEGAL",
            sectionNum: 9,
            question: "Is your business entity officially registered with corporate authorities?",
            type: "radio",
            options: [
                { text: "Yes, fully registered and compliant", points: 25, isMissing: false, fact: "Officially registered business entity" },
                { text: "In progress / Sole proprietor setup", points: 12, isMissing: true, fact: "Incomplete corporate registration" },
                { text: "No registration", points: 0, isMissing: true, fact: "Missing: Official business registration" }
            ]
        },
        {
            section: "LEGAL",
            sectionNum: 9,
            question: "Is there a Privacy Policy and Terms of Service link on your website footer?",
            type: "radio",
            options: [
                { text: "Yes, fully up-to-date and visible", points: 25, isMissing: false, fact: "Visible Privacy & Terms pages" },
                { text: "No, we don't have these pages or no website", points: 0, isMissing: true, fact: "Missing: Legal privacy policies" }
            ]
        },
        {
            section: "LEGAL",
            sectionNum: 9,
            question: "Does your website use a secure HTTPS connection?",
            type: "radio",
            options: [
                { text: "Yes, secure SSL badge visible", points: 25, isMissing: false, fact: "Secure SSL connection active" },
                { text: "No SSL (HTTP only) or no website", points: 0, isMissing: true, fact: "Missing: HTTPS security configuration" }
            ]
        },
        {
            section: "LEGAL",
            sectionNum: 9,
            question: "Is your physical office address or official support contact displayed clearly?",
            type: "radio",
            options: [
                { text: "Yes, clear address and phone details listed", points: 25, isMissing: false, fact: "Verified support contact info" },
                { text: "Only a contact form, no physical address shown", points: 12, isMissing: true, fact: "No physical address details shown" },
                { text: "No address or contact info visible", points: 0, isMissing: true, fact: "Missing: Clear support address details" }
            ]
        },

        // Section 10: COMPETITIVE AWARENESS (5 Questions)
        {
            section: "COMPETITIVE",
            sectionNum: 10,
            question: "Do you know exactly who your top 3-5 competitors are?",
            type: "radio",
            options: [
                { text: "Yes, we monitor them regularly", points: 25, isMissing: false, fact: "Active competitor intelligence" },
                { text: "Vaguely, we know a couple of names", points: 12, isMissing: true, fact: "Basic competitor awareness" },
                { text: "No, we do not pay attention to them", points: 0, isMissing: true, fact: "Missing: Competitor market research" }
            ]
        },
        {
            section: "COMPETITIVE",
            sectionNum: 10,
            question: "Can you explain what your competitors do better than your business?",
            type: "radio",
            options: [
                { text: "Yes, we have analysed their strengths clearly", points: 25, isMissing: false, fact: "Mapped competitor strengths" },
                { text: "Vaguely, they might have more resources/marketing", points: 12, isMissing: true, fact: "Abstract competitor analysis" },
                { text: "No idea or we assume we do everything better", points: 0, isMissing: true, fact: "Missing: Competitor strength evaluation" }
            ]
        },
        {
            section: "COMPETITIVE",
            sectionNum: 10,
            question: "Can you explain what your business does better than competitors?",
            type: "radio",
            options: [
                { text: "Yes, we have a clear competitive edge", points: 25, isMissing: false, fact: "Clearly defined competitive edge" },
                { text: "Vaguely, we believe we have friendly service", points: 12, isMissing: true, fact: "Weak competitive distinction" },
                { text: "No idea or we offer the exact same thing", points: 0, isMissing: true, fact: "Missing: Clear market advantage" }
            ]
        },
        {
            section: "COMPETITIVE",
            sectionNum: 10,
            question: "Have you reviewed your top competitors' websites in the last 30 days?",
            type: "radio",
            options: [
                { text: "Yes, we audit their visual styles and pricing", points: 25, isMissing: false, fact: "Regular competitor site audits" },
                { text: "Only briefly browsed once or twice long ago", points: 12, isMissing: true, fact: "Outdated competitor site reviews" },
                { text: "No, we never review them", points: 0, isMissing: true, fact: "Missing: Competitor site reviews" }
            ]
        },
        {
            section: "COMPETITIVE",
            sectionNum: 10,
            question: "Do you understand why customers choose your competitors over you?",
            type: "radio",
            options: [
                { text: "Yes, we have surveyed lost opportunities", points: 25, isMissing: false, fact: "Analysed lost client opportunities" },
                { text: "Somewhat, usually comes down to pricing/discounts", points: 12, isMissing: true, fact: "Assumed price-only loss reasons" },
                { text: "No, we have no idea why we lose deals", points: 0, isMissing: true, fact: "Missing: Lost prospect analysis" }
            ]
        }
    ];

    const categoryMaxPoints = {
        PROFILE: 175,
        DISCOVERABILITY: 150,
        WEBSITE: 175,
        POSITIONING: 125,
        SOCIAL_PROOF: 125,
        SOCIAL_MEDIA: 125,
        LEAD_CAPTURE: 175,
        RETENTION: 100,
        LEGAL: 100,
        COMPETITIVE: 125
    };

    const opportunityOutcomes = {
        DISCOVERABILITY: ['Customers find you easily on Google', 'Your business appears in local searches', 'More walk-in and organic traffic'],
        WEBSITE: ['Visitors trust you more on first visit', 'People know exactly what you offer', 'More visitors take action (call/book/inquire)'],
        POSITIONING: ['Stand out from competitors clearly', 'Attract your ideal customers', 'Command premium pricing'],
        SOCIAL_PROOF: ['New customers trust you before calling', 'Rank higher in Google Search', 'Get more organic business'],
        SOCIAL_MEDIA: ['Build an engaged community', 'Stay top of mind with customers', 'Generate leads organically'],
        LEAD_CAPTURE: ['Customers book 24/7, even when you sleep', 'Reduce admin work by 15+ hours/month', 'Never miss a booking opportunity'],
        RETENTION: ['Customers come back more often', 'Get more referrals automatically', 'Increase lifetime customer value'],
        LEGAL: ['Build customer trust and credibility', 'Protect your business legally', 'Meet industry compliance standards'],
        COMPETITIVE: ['Identify gaps in your market', 'Learn from competitor strategies', 'Position yourself strategically'],
        PROFILE: ['Have a clear business identity', 'Present professionally online', 'Make it easy for customers to find you']
    };

    const snapshotStates = {
        DISCOVERABILITY: { today: 'Hard to find online', future: 'Easy to discover' },
        WEBSITE: { today: 'Weak first impression', future: 'Professional presence' },
        POSITIONING: { today: 'Unclear value proposition', future: 'Clear differentiation' },
        SOCIAL_PROOF: { today: 'Limited customer trust', future: 'Strong trust signals' },
        SOCIAL_MEDIA: { today: 'Low social engagement', future: 'Active community' },
        LEAD_CAPTURE: { today: 'Manual inquiries', future: 'Automated leads' },
        RETENTION: { today: 'Low repeat business', future: 'Loyal customer base' },
        LEGAL: { today: 'Missing trust signals', future: 'Full legal compliance' },
        COMPETITIVE: { today: 'Unaware of competition', future: 'Strategic market position' }
    };

    // --- Session ID & Config Loader ---
    let sessionId = localStorage.getItem('bga_session_id');
    if (!sessionId) {
        sessionId = 'BGA_SESS_' + Math.random().toString(36).substring(2, 11).toUpperCase() + '_' + Date.now();
        localStorage.setItem('bga_session_id', sessionId);
    }

    let paystackPublicKey = '';
    fetch('/.netlify/functions/get-config')
        .then(res => res.json())
        .then(config => {
            paystackPublicKey = config.paystackPublicKey || '';
        })
        .catch(err => console.error("Error loading config:", err));

    // --- State Variables ---
    let userData = {
        businessName: "",
        email: "",
        phone: "",
        industry: "",
        location: "",
        yearsInBusiness: "",
        employeesCount: "",
        websiteUrl: "",
        socialPlatforms: []
    };
    let currentQuestionIndex = 0;
    let answers = new Array(quizData.length).fill(null);

    // --- DOM Elements ---
    const screenIntro = document.getElementById('bga-intro');
    const screenQuestions = document.getElementById('bga-questions');
    const screenCalculating = document.getElementById('bga-calculating');
    const screenResults = document.getElementById('bga-results');

    const introForm = document.getElementById('bga-intro-form');
    const resumePrompt = document.getElementById('bga-resume-prompt');
    const resumeBtn = document.getElementById('bga-resume-btn');
    const restartBtn = document.getElementById('bga-restart-btn');

    const progressBar = document.getElementById('bga-progress-bar');
    const progressText = document.getElementById('bga-progress-text');
    const sectionTag = document.getElementById('bga-section-tag');
    const questionText = document.getElementById('bga-question-text');
    const optionsContainer = document.getElementById('bga-options');
    const profileInputContainer = document.getElementById('bga-profile-input');

    const backBtn = document.getElementById('bga-back-btn');
    const nextBtn = document.getElementById('bga-next-btn');

    // --- Start Button Form State Check ---
    const startBtn = document.getElementById('bga-start-btn');
    const bizNameInput = document.getElementById('bga-business-name');
    const emailInput = document.getElementById('bga-email');
    const phoneInput = document.getElementById('bga-phone');

    function checkStartBtnState() {
        if (!bizNameInput || !emailInput || !phoneInput || !startBtn) return;
        const nameVal = bizNameInput.value.trim();
        const emailVal = emailInput.value.trim();
        const phoneVal = phoneInput.value.trim();
        
        startBtn.disabled = !(nameVal !== "" && emailVal !== "" && phoneVal !== "");
    }

    if (bizNameInput && emailInput && phoneInput) {
        bizNameInput.addEventListener('input', checkStartBtnState);
        emailInput.addEventListener('input', checkStartBtnState);
        phoneInput.addEventListener('input', checkStartBtnState);
    }

    // --- State Storage Helpers ---
    function saveProgress() {
        const progressData = {
            index: currentQuestionIndex,
            answers: answers,
            userData: userData,
            timestamp: Date.now()
        };
        localStorage.setItem('bga_progress', JSON.stringify(progressData));
    }

    function checkResumeState() {
        const saved = localStorage.getItem('bga_progress');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Check if session is older than 24 hours (86400000 ms)
                if (Date.now() - parsed.timestamp < 86400000) {
                    resumePrompt.style.display = 'block';
                    // Populate initial form fields if they exist
                    if (parsed.userData) {
                        if (bizNameInput) bizNameInput.value = parsed.userData.businessName || "";
                        if (emailInput) emailInput.value = parsed.userData.email || "";
                        if (phoneInput) phoneInput.value = parsed.userData.phone || "";
                        checkStartBtnState();
                    }
                    return parsed;
                } else {
                    localStorage.removeItem('bga_progress');
                }
            } catch (e) {
                console.error("Error reading saved progress", e);
            }
        }
        return null;
    }

    // --- Init Check ---
    const savedSession = checkResumeState();

    // Prefill business name from URL query parameter if present
    const urlParams = new URLSearchParams(window.location.search);
    const businessNameParam = urlParams.get('businessName');
    if (businessNameParam && bizNameInput) {
        bizNameInput.value = businessNameParam;
        checkStartBtnState();
    }

    if (introForm) {
        introForm.addEventListener('submit', (e) => {
            e.preventDefault();
            userData.businessName = bizNameInput.value.trim();
            userData.email = emailInput.value.trim();
            userData.phone = phoneInput.value.trim();
            
            // Auto fill profile question 1 answer with business name
            answers[0] = userData.businessName;

            localStorage.setItem('bga_user', JSON.stringify({
                name: userData.businessName,
                email: userData.email,
                phone: userData.phone
            }));

            // Sync/Create session row immediately in Google Sheets (non-blocking)
            fetch('/.netlify/functions/audit-log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'create',
                    sessionId: sessionId,
                    data: {
                        businessName: userData.businessName,
                        email: userData.email,
                        phone: userData.phone
                    }
                })
            }).catch(err => console.error("Logging initial creation failed:", err));

            showScreen(screenQuestions);
            loadQuestion(1); // Jump to question index 1 (Industry) since index 0 (Business Name) is answered
        });
    }

    if (resumeBtn && savedSession) {
        resumeBtn.addEventListener('click', () => {
            currentQuestionIndex = savedSession.index;
            answers = savedSession.answers;
            userData = savedSession.userData;
            showScreen(screenQuestions);
            loadQuestion(currentQuestionIndex);
        });
    }

    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            localStorage.removeItem('bga_progress');
            resumePrompt.style.display = 'none';
            introForm.reset();
        });
    }

    backBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 1) {
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
        } else if (currentQuestionIndex === 1) {
            // Go back to intro screen
            showScreen(screenIntro);
        }
    });

    nextBtn.addEventListener('click', () => {
        // Collect inputs if profile question
        const q = quizData[currentQuestionIndex];
        if (q.type === 'profile') {
            const isValid = validateAndCollectProfileInput(q);
            if (!isValid) return;
        }

        // Log answer update to Google Sheets (non-blocking async)
        const ansVal = answers[currentQuestionIndex];
        const logAns = q.type === 'profile' ? ansVal : (ansVal ? ansVal.text : null);
        if (logAns !== null) {
            fetch('/.netlify/functions/audit-log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'update',
                    sessionId: sessionId,
                    data: {
                        type: 'answer',
                        questionNum: currentQuestionIndex + 1,
                        answerText: Array.isArray(logAns) ? logAns.join(', ') : String(logAns)
                    }
                })
            }).catch(err => console.error("Logging answer update failed:", err));
        }

        if (currentQuestionIndex < quizData.length - 1) {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
        } else {
            processCompletion();
        }
    });

    // --- Screen Control ---
    function showScreen(screenEl) {
        [screenIntro, screenQuestions, screenCalculating, screenResults].forEach(s => {
            if (s) s.classList.remove('bga-screen--active');
        });
        if (screenEl) screenEl.classList.add('bga-screen--active');
    }
    // --- Question Rendering ---
    function loadQuestion(index) {
        currentQuestionIndex = index;
        const q = quizData[index];

        // Section Badges & Labels
        sectionTag.textContent = q.section.replace('_', ' ');
        sectionTag.className = `bga-category-tag bga-category-tag--${q.section.toLowerCase().replace('_', '-')}`;
        questionText.textContent = q.question;

        // Progress Calculations
        const currentProgressPercent = Math.round((index / quizData.length) * 100);
        progressBar.style.width = `${currentProgressPercent}%`;
        progressText.textContent = `Section ${q.sectionNum} of 10 • Question ${index + 1} of ${quizData.length}`;

        // Reassurance Note visibility (first profile question, index 1)
        const reassuranceEl = document.getElementById('bga-reassurance');
        if (reassuranceEl) {
            reassuranceEl.style.display = (index === 1) ? 'block' : 'none';
        }

        // Progress Encouragement subtext
        const encouragementEl = document.getElementById('bga-progress-encouragement');
        if (encouragementEl) {
            if (currentProgressPercent >= 50 && currentProgressPercent < 75) {
                encouragementEl.textContent = "⚡ You're halfway there! Keep going.";
                encouragementEl.style.opacity = '1';
            } else if (currentProgressPercent >= 75 && currentProgressPercent < 95) {
                encouragementEl.textContent = "🚀 Almost finished! Just a few more.";
                encouragementEl.style.opacity = '1';
            } else {
                encouragementEl.style.opacity = '0';
            }
        }

        // Reset display wrappers
        optionsContainer.style.display = 'none';
        profileInputContainer.style.display = 'none';
        optionsContainer.innerHTML = '';
        profileInputContainer.innerHTML = '';

        nextBtn.disabled = true;

        if (q.type === 'profile') {
            questionText.style.display = 'none'; // Hide redundant question text for profile
            profileInputContainer.style.display = 'block';
            renderProfileField(q);
        } else {
            questionText.style.display = 'block'; // Show question text
            optionsContainer.style.display = 'flex';
            renderOptionCards(q);
        }

        saveProgress();
    }

    function renderOptionCards(q) {
        q.options.forEach((opt, i) => {
            const card = document.createElement('div');
            card.className = 'bga-option-card';
            
            // Check if option was previously selected
            const isSelected = answers[currentQuestionIndex] && answers[currentQuestionIndex].text === opt.text;
            if (isSelected) {
                card.classList.add('selected');
                nextBtn.disabled = false;
            }

            card.innerHTML = `
                <div class="bga-option-card__radio"></div>
                <div class="bga-option-card__text">${opt.text}</div>
            `;

            card.addEventListener('click', () => {
                // Clear selections
                optionsContainer.querySelectorAll('.bga-option-card').forEach(c => {
                    c.classList.remove('selected');
                });
                card.classList.add('selected');
                answers[currentQuestionIndex] = opt;
                nextBtn.disabled = false;

                // Auto advance on radio selection (300ms delay for premium touch feel)
                setTimeout(() => {
                    if (currentQuestionIndex === indexToMatch(q)) {
                        nextBtn.click();
                    }
                }, 300);
            });

            optionsContainer.appendChild(card);
        });
    }

    function indexToMatch(q) {
        // Helper to check if user has not changed selection index during the delay
        return currentQuestionIndex;
    }

    function renderProfileField(q) {
        const formGroup = document.createElement('div');
        formGroup.className = 'bga-intro__form-group';

        const label = document.createElement('label');
        label.textContent = q.label;
        formGroup.appendChild(label);

        const savedVal = answers[currentQuestionIndex] || "";

        if (q.inputType === 'text' || q.inputType === 'url') {
            const input = document.createElement('input');
            input.type = q.inputType;
            input.className = 'bga-intro__input';
            input.value = savedVal;
            input.placeholder = q.placeholder || "";
            input.required = q.required;
            input.addEventListener('input', () => {
                nextBtn.disabled = q.required && input.value.trim() === "";
            });
            formGroup.appendChild(input);
            nextBtn.disabled = q.required && input.value.trim() === "";
        } else if (q.inputType === 'select') {
            const select = document.createElement('select');
            select.className = 'bga-intro__input';
            select.required = q.required;

            const defaultOpt = document.createElement('option');
            defaultOpt.value = "";
            defaultOpt.disabled = true;
            defaultOpt.selected = savedVal === "";
            defaultOpt.textContent = "Select an option";
            select.appendChild(defaultOpt);

            q.options.forEach(optVal => {
                const opt = document.createElement('option');
                opt.value = optVal;
                opt.selected = savedVal === optVal;
                opt.textContent = optVal;
                select.appendChild(opt);
            });

            select.addEventListener('change', () => {
                nextBtn.disabled = select.value === "";
            });
            formGroup.appendChild(select);
            nextBtn.disabled = select.value === "";
        } else if (q.inputType === 'checkboxes') {
            const checkboxContainer = document.createElement('div');
            checkboxContainer.className = 'bga-checkbox-group';

            const checkedList = Array.isArray(savedVal) ? savedVal : [];

            q.options.forEach(optVal => {
                const labelWrapper = document.createElement('label');
                labelWrapper.className = 'bga-checkbox-label';

                const checkbox = document.createElement('input');
                checkbox.type = 'checkbox';
                checkbox.value = optVal;
                checkbox.checked = checkedList.includes(optVal);

                const span = document.createElement('span');
                span.textContent = optVal;

                labelWrapper.appendChild(checkbox);
                labelWrapper.appendChild(span);
                checkboxContainer.appendChild(labelWrapper);
            });

            // Checkboxes are optional, so enable Next button immediately
            nextBtn.disabled = false;
            formGroup.appendChild(checkboxContainer);
        }

        profileInputContainer.appendChild(formGroup);
    }

    function validateAndCollectProfileInput(q) {
        if (q.inputType === 'checkboxes') {
            const checked = [];
            profileInputContainer.querySelectorAll('input[type="checkbox"]:checked').forEach(cb => {
                checked.push(cb.value);
            });
            answers[currentQuestionIndex] = checked;
            userData[q.fieldName] = checked;
            return true;
        }

        const inputEl = profileInputContainer.querySelector('input, select');
        if (!inputEl) return false;

        if (q.required && inputEl.value.trim() === "") {
            inputEl.classList.add('bga-form-input--error');
            inputEl.classList.add('error');
            return false;
        }

        const collectedVal = inputEl.value.trim();
        answers[currentQuestionIndex] = collectedVal;
        userData[q.fieldName] = collectedVal;
        return true;
    }

    // --- Calculations & Final Screen ---
    function processCompletion() {
        showScreen(screenCalculating);
        
        // Stored Profile Data Scoring Allocations (Minimal profile scoring logic)
        let profilePoints = 0;
        // Business Name provided
        profilePoints += 25; 
        // Industry provided
        profilePoints += answers[1] ? 25 : 0;
        // Location provided
        profilePoints += answers[2] ? 25 : 0;
        // Years in Business
        const yearsVal = answers[3];
        if (yearsVal === "Less than 1" || yearsVal === "1-2") profilePoints += 12;
        else if (yearsVal) profilePoints += 25;
        // Employees Count
        const empVal = answers[4];
        if (empVal === "Just me" || empVal === "2-5") profilePoints += 12;
        else if (empVal) profilePoints += 25;
        // Website URL provided
        profilePoints += (answers[5] && answers[5].trim() !== "") ? 25 : 0;
        // Social platforms active
        const socials = answers[6];
        if (socials && socials.length > 2) profilePoints += 25;
        else if (socials && socials.length > 0 && !socials.includes("None")) profilePoints += 12;

        // Execute calculating screen delay (1.5 seconds)
        setTimeout(() => {
            renderResultsReport(profilePoints);
            showScreen(screenResults);
            localStorage.removeItem('bga_progress'); // Clean up progress
        }, 1500);
    }

    function renderResultsReport(profilePoints) {
        let scores = {
            PROFILE: profilePoints,
            DISCOVERABILITY: 0,
            WEBSITE: 0,
            POSITIONING: 0,
            SOCIAL_PROOF: 0,
            SOCIAL_MEDIA: 0,
            LEAD_CAPTURE: 0,
            RETENTION: 0,
            LEGAL: 0,
            COMPETITIVE: 0
        };

        // Sum standard question points
        quizData.forEach((q, idx) => {
            if (q.type !== 'profile') {
                const selectedOpt = answers[idx];
                if (selectedOpt && selectedOpt.points) {
                    scores[q.section] += selectedOpt.points;
                }
            }
        });

        // Compute Total Score
        let rawTotal = 0;
        for (const sec in scores) {
            rawTotal += scores[sec];
        }
        const maxScoreTotal = 1375;
        const totalPercentage = Math.min(Math.round((rawTotal / maxScoreTotal) * 100), 100);

        // Dictionaries for dynamic template explanations
        const categoryWhyMatters = {
            PROFILE: "A clear profile defines who you are and who you serve.",
            DISCOVERABILITY: "If customers can't find you, they can't buy from you.",
            WEBSITE: "Your website is your 24/7 digital storefront.",
            POSITIONING: "Positioning tells buyers why they should choose you over anyone else.",
            SOCIAL_PROOF: "Strangers need someone else's voice to trust yours.",
            SOCIAL_MEDIA: "Social media shows that your business is active and alive.",
            LEAD_CAPTURE: "Warm attention with no exit ramp is wasted attention.",
            RETENTION: "Acquisition without retention is a leaky bucket.",
            LEGAL: "Security and compliance establish institutional trust.",
            COMPETITIVE: "Understanding the landscape lets you win the comparison game."
        };

        const categoryGapExplanations = {
            PROFILE: "Your baseline business profiles lack clarity or complete details, making it hard for prospects to quickly understand what you offer.",
            DISCOVERABILITY: "Your search visibility and map listings are incomplete, hiding your business from active local buyers.",
            WEBSITE: "Slow load speeds, weak mobile layout, or technical friction are driving visitors away before they convert.",
            POSITIONING: "Your unique value proposition isn't clear, causing prospects to view you as a commodity rather than a leader.",
            SOCIAL_PROOF: "A lack of visible reviews, case studies, or client success signals makes prospects hesitant to engage.",
            SOCIAL_MEDIA: "Inconsistent posts or inactive profiles signal to potential clients that your brand is dormant.",
            LEAD_CAPTURE: "Interested visitors leave your site without any structured way to stay connected or capture their info.",
            RETENTION: "There is no systematic follow-up or retention mechanism keeping past clients coming back.",
            LEGAL: "Missing privacy policies, terms, or clear legal structures expose your brand to risk.",
            COMPETITIVE: "Lack of active benchmarking means you aren't tracking competitor changes or adjusting pricing strategy."
        };

        // Dictionaries for Maturity Stages (matching PDF designs)
        const stagesInfo = [
            {
                name: "Invisible",
                rank: "01 / 05",
                looksSubhead: "Unsearchable business, no digital footprint.",
                bullets: [
                    "You are not visible in local search",
                    "You have no central website storefront",
                    "You rely entirely on manual offline efforts"
                ],
                nextStage: "Present",
                nextLooksSubhead: "Basic online footprint, disjointed presence.",
                nextBullets: [
                    "Basic website and listings set up",
                    "Found by name, if not by service",
                    "Clear baseline profiles created"
                ],
                patternQuote: "Businesses at this stage are digitally locked out of the market — prospects cannot confirm they exist."
            },
            {
                name: "Present",
                rank: "02 / 05",
                looksSubhead: "Basic online footprint, disjointed presence.",
                bullets: [
                    "You are found by name, not by service",
                    "Your website is basic or outdated",
                    "Your profiles lack active postings"
                ],
                nextStage: "Credible",
                nextLooksSubhead: "Looks professional, builds trust.",
                nextBullets: [
                    "Consistent professional design language",
                    "Clear value proposition and positioning",
                    "Active reviews and social proof visible"
                ],
                patternQuote: "Present but silent. Traffic arrives but leaves immediately because the credibility bar isn't met."
            },
            {
                name: "Credible",
                rank: "03 / 05",
                looksSubhead: "Looks professional, builds trust.",
                bullets: [
                    "You look professional at a glance",
                    "You convert when someone is already sold",
                    "You depend on referrals and word of mouth"
                ],
                nextStage: "Growing",
                nextLooksSubhead: "Systems in place, consistent traction.",
                nextBullets: [
                    "A structured content and channel rhythm",
                    "Lead capture and follow-up wired together",
                    "Traffic that returns, not just arrives"
                ],
                patternQuote: "Businesses at this stage look credible but almost none have set up retention — most traffic never returns."
            },
            {
                name: "Growing",
                rank: "04 / 05",
                looksSubhead: "Systems in place, consistent traction.",
                bullets: [
                    "Your content has rhythmic channels",
                    "You capture lead information systematically",
                    "Some traffic returns automatically"
                ],
                nextStage: "Compounding",
                nextLooksSubhead: "Dominating search, automated conversions.",
                nextBullets: [
                    "Full loop automation across channels",
                    "Strong brand referrals and authority",
                    "Multi-channel retention and loyalty"
                ],
                patternQuote: "Traction is active, but friction in lead capture or checkout leaks up to 30% of potential conversions."
            },
            {
                name: "Compounding",
                rank: "05 / 05",
                looksSubhead: "Dominating search, automated conversions.",
                bullets: [
                    "You dominate local discoverability",
                    "Your web conversions are automated",
                    "You retain and grow customer lifetime value"
                ],
                nextStage: "Elite",
                nextLooksSubhead: "Ongoing growth supremacy.",
                nextBullets: [
                    "Continuous CRO tests running monthly",
                    "Active category expansion strategies"
                ],
                patternQuote: "Market leader status is achieved, but stay disciplined — competitor updates happen fast."
            }
        ];

        // Determine active stage based on composite score
        let activeStageIndex = 2; // Default to Credible (Stage 3)
        if (totalPercentage <= 30) activeStageIndex = 0;
        else if (totalPercentage <= 50) activeStageIndex = 1;
        else if (totalPercentage <= 70) activeStageIndex = 2;
        else if (totalPercentage <= 85) activeStageIndex = 3;
        else activeStageIndex = 4;

        const activeStage = stagesInfo[activeStageIndex];

        // Render Stage Header & Description
        document.getElementById('bga-stage-rank').textContent = activeStage.rank;
        document.getElementById('bga-stage-title').textContent = activeStage.name + ".";
        
        // Assemble diagnostic explanation sentence
        const diagnosticSentence = `You have a ${activeStage.name.toLowerCase()} baseline presence, but ${activeStage.looksSubhead.toLowerCase()} and ${activeStage.bullets[1].toLowerCase()}.`;
        document.getElementById('bga-stage-desc').textContent = diagnosticSentence;
        document.getElementById('bga-composite-score').textContent = totalPercentage;

        // Render Growth Ladder Horizontal Blocks
        const ladderGrid = document.getElementById('bga-ladder-grid');
        if (ladderGrid) {
            ladderGrid.innerHTML = '';
            stagesInfo.forEach((st, idx) => {
                const isActive = idx === activeStageIndex;
                const isPassed = idx < activeStageIndex;
                const item = document.createElement('div');
                item.style.padding = '14px 10px';
                item.style.borderTop = isActive ? '4px solid #3a7bff' : (isPassed ? '4px solid #0f172a' : '4px solid #e2e8f0');
                item.style.color = isActive ? '#3a7bff' : (isPassed ? '#0f172a' : '#94a3b8');
                item.style.fontWeight = isActive ? '700' : '500';
                item.style.fontFamily = "'Space Grotesk', sans-serif";
                item.style.textAlign = 'left';
                item.innerHTML = `
                    <div style="font-family: 'JetBrains Mono', monospace; font-size: 10px; margin-bottom: 4px;">0${idx+1}</div>
                    <div style="font-size: 13px; text-transform: capitalize;">${st.name}</div>
                `;
                ladderGrid.appendChild(item);
            });
        }

        // Render SECTION 01: All 10 Category scores
        const categories = Object.keys(categoryMaxPoints);
        const breakdownListEl = document.getElementById('bga-breakdown-list');
        if (breakdownListEl) {
            breakdownListEl.innerHTML = '';
            categories.forEach(cat => {
                const scoreVal = scores[cat] || 0;
                const maxVal = categoryMaxPoints[cat];
                const pct = Math.round((scoreVal / maxVal) * 100);
                
                const row = document.createElement('div');
                row.style.display = 'flex';
                row.style.justifyContent = 'space-between';
                row.style.alignItems = 'baseline';
                row.style.padding = '14px 0';
                row.style.borderBottom = '1px solid #f1f5f9';
                row.innerHTML = `
                    <span style="font-family: 'Space Grotesk', sans-serif; font-weight: 500; font-size: 15px; color: #475569; text-transform: uppercase;">${cat.replace('_', ' ')}</span>
                    <span style="font-family: 'JetBrains Mono', monospace; font-weight: 700; font-size: 15px; color: #0f172a;">${pct}</span>
                `;
                breakdownListEl.appendChild(row);
            });
        }

        // Identify Top 3 Gaps (lowest scoring categories)
        const sortedCats = categories.map(cat => {
            const scoreVal = scores[cat] || 0;
            const maxVal = categoryMaxPoints[cat];
            return {
                name: cat,
                percentage: Math.round((scoreVal / maxVal) * 100)
            };
        }).sort((a, b) => a.percentage - b.percentage); // Lowest percentage first

        const top3Gaps = sortedCats.slice(0, 3);

        // Render SECTION 02: 3 Leverage Gaps
        const gapsListEl = document.getElementById('bga-gaps-list');
        if (gapsListEl) {
            gapsListEl.innerHTML = '';
            top3Gaps.forEach((gap, idx) => {
                const whyText = categoryWhyMatters[gap.name] || 'This area represents a crucial foundation for growth.';
                
                const gapItem = document.createElement('div');
                gapItem.style.borderBottom = '1px solid #e2e8f0';
                gapItem.style.paddingBottom = '32px';
                gapItem.innerHTML = `
                    <div style="display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 8px;">
                        <div>
                            <span style="font-family: 'JetBrains Mono', monospace; font-size: 13px; color: #3a7bff; margin-right: 16px; font-weight: 700;">0${idx+1}</span>
                            <span style="font-family: 'Space Grotesk', sans-serif; font-size: 20px; font-weight: 700; color: #000; text-transform: uppercase;">${gap.name.replace('_', ' ')}</span>
                        </div>
                        <div style="font-family: 'JetBrains Mono', monospace; font-size: 15px; font-weight: 700; color: #ef4444;">${gap.percentage} / 100</div>
                    </div>
                    <p style="font-size: 15px; color: #64748b; line-height: 1.6; font-weight: 500; margin: 0;">
                        Why it matters &mdash; ${whyText}
                    </p>
                `;
                gapsListEl.appendChild(gapItem);
            });
        }

        // Render SECTION 03: Sequenced Roadmap
        const roadmapListEl = document.getElementById('bga-roadmap-list');
        if (roadmapListEl) {
            roadmapListEl.innerHTML = '';
            top3Gaps.forEach((gap, idx) => {
                const nextGap = top3Gaps[idx + 1];
                const gapDetail = categoryGapExplanations[gap.name] || 'Unoptimized processes slow growth.';
                const unlocksMsg = nextGap ? `UNLOCKS &rarr; YOU'RE MISSING ${nextGap.name.replace('_', ' ')}.` : '';
                
                const stepItem = document.createElement('div');
                stepItem.style.display = 'flex';
                stepItem.style.gap = '20px';
                stepItem.style.alignItems = 'flex-start';
                stepItem.innerHTML = `
                    <div style="border: 2px solid #000; padding: 6px 12px; font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: 16px; line-height: 1; color: #000; margin-top: 2px;">
                        ${idx + 1}
                    </div>
                    <div>
                        <h4 style="font-family: 'Space Grotesk', sans-serif; font-size: 18px; font-weight: 700; color: #000; margin-bottom: 6px; text-transform: uppercase;">
                            You have no ${gap.name.toLowerCase().replace('_', ' ')} loop.
                        </h4>
                        <p style="font-size: 15px; color: #64748b; line-height: 1.5; margin: 0 0 10px 0; font-weight: 500;">
                            Because ${gapDetail}
                        </p>
                        ${unlocksMsg ? `<div style="font-family: 'JetBrains Mono', monospace; font-size: 11px; letter-spacing: 0.05em; color: #3a7bff; font-weight: 700; text-transform: uppercase;">${unlocksMsg}</div>` : ''}
                    </div>
                `;
                roadmapListEl.appendChild(stepItem);
            });
        }

        // Render NOW vs POTENTIAL stage preview
        const detailsGridEl = document.getElementById('bga-stage-details-grid');
        if (detailsGridEl) {
            detailsGridEl.innerHTML = `
                <div style="border-right: 1px solid #f1f5f9; padding-right: 24px;">
                    <div class="mono-small" style="color: #64748b; margin-bottom: 8px;">NOW</div>
                    <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 700; margin-bottom: 8px; color: #000;">${activeStage.name}</h3>
                    <p style="font-size: 15px; color: #64748b; margin-bottom: 24px; font-weight: 500;">${activeStage.looksSubhead}</p>
                    <ul style="display: flex; flex-direction: column; gap: 16px; list-style: none; padding: 0;">
                        ${activeStage.bullets.map(b => `
                            <li style="display: flex; gap: 12px; font-size: 14px; color: #475569; font-weight: 500; align-items: baseline;">
                                <span style="color: #ef4444; font-family: monospace;">-</span>
                                <span>${b}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div>
                    <div class="mono-small" style="color: #64748b; margin-bottom: 8px;">NEXT &rarr; STAGE 0${activeStageIndex === 4 ? 5 : activeStageIndex + 2}</div>
                    <h3 style="font-family: 'Space Grotesk', sans-serif; font-size: 28px; font-weight: 700; margin-bottom: 8px; color: #3a7bff;">${activeStage.nextStage}</h3>
                    <p style="font-size: 15px; color: #64748b; margin-bottom: 24px; font-weight: 500;">${activeStage.nextLooksSubhead}</p>
                    <ul style="display: flex; flex-direction: column; gap: 16px; list-style: none; padding: 0;">
                        ${activeStage.nextBullets.map(b => `
                            <li style="display: flex; gap: 12px; font-size: 14px; color: #475569; font-weight: 500; align-items: baseline;">
                                <span style="color: #10b981; font-family: monospace;">+</span>
                                <span>${b}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
        }

        // Render Pattern quotes
        const patternBlockEl = document.getElementById('bga-pattern-block');
        if (patternBlockEl) {
            patternBlockEl.innerHTML = `
                <div class="mono-small" style="color: #64748b; margin-bottom: 16px;">PATTERN</div>
                <blockquote style="font-family: 'Space Grotesk', sans-serif; font-size: 24px; font-weight: 600; line-height: 1.45; color: #0f172a; border-left: none; padding-left: 0; margin: 0 0 16px 0;">
                    &ldquo;${activeStage.patternQuote}&rdquo;
                </blockquote>
                <p style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: #94a3b8; letter-spacing: 0.1em; text-transform: uppercase; margin: 0;">
                    PATTERN-LEVEL OBSERVATION ACROSS BUSINESSES AT STAGE ${activeStageIndex + 1}. NOT A CLAIM ABOUT ANY SPECIFIC COMPETITOR.
                </p>
            `;
        }

        // Lock & Unlock Management
        function applyLockState(isPaid) {
            const breakdownLock = document.getElementById('bga-breakdown-lock');
            const breakdownList = document.getElementById('bga-breakdown-list');
            const roadmapLock = document.getElementById('bga-roadmap-lock');
            const roadmapList = document.getElementById('bga-roadmap-list');
            const partnershipLock = document.getElementById('bga-partnership-lock');
            const partnershipEl = document.getElementById('bga-partnership');
            const schedulingCard = document.getElementById('bga-scheduling-card');
            const upsellCard = document.getElementById('bga-upsell');

            if (isPaid) {
                if (breakdownLock) breakdownLock.style.display = 'none';
                if (breakdownList) breakdownList.classList.remove('bga-paywall-blur');
                if (roadmapLock) roadmapLock.style.display = 'none';
                if (roadmapList) roadmapList.classList.remove('bga-paywall-blur');
                if (partnershipLock) partnershipLock.style.display = 'none';
                if (partnershipEl) partnershipEl.classList.remove('bga-paywall-blur');
                if (schedulingCard) schedulingCard.style.display = 'block';
                if (upsellCard) upsellCard.style.display = 'none';
            } else {
                if (breakdownLock) breakdownLock.style.display = 'flex';
                if (breakdownList) breakdownList.classList.add('bga-paywall-blur');
                if (roadmapLock) roadmapLock.style.display = 'flex';
                if (roadmapList) roadmapList.classList.add('bga-paywall-blur');
                if (partnershipLock) partnershipLock.style.display = 'flex';
                if (partnershipEl) partnershipEl.classList.add('bga-paywall-blur');
                if (schedulingCard) schedulingCard.style.display = 'none';
                if (upsellCard) upsellCard.style.display = 'block';
            }
        }

        const isAlreadyPaid = localStorage.getItem('bga_paid') === 'true';
        applyLockState(isAlreadyPaid);

        // Setup Paystack Popup Triggers
        const unlockButtons = document.querySelectorAll('.bga-btn-unlock-trigger, #bga-blueprint-cta');
        unlockButtons.forEach(btn => {
            btn.replaceWith(btn.cloneNode(true)); // Clean listeners to prevent duplicate triggers
        });

        const refreshedButtons = document.querySelectorAll('.bga-btn-unlock-trigger, #bga-blueprint-cta');
        refreshedButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                
                if (!paystackPublicKey) {
                    alert("Paystack payment system is currently initializing. Please try again in a few seconds.");
                    return;
                }

                btn.textContent = "Opening Checkout...";
                btn.disabled = true;

                const handler = PaystackPop.setup({
                    key: paystackPublicKey,
                    email: userData.email || 'customer@company.com',
                    amount: 5000 * 100, // ₦5,000 in kobo
                    currency: 'NGN',
                    ref: 'BGA_' + Math.random().toString(36).substring(2, 11).toUpperCase() + '_' + Date.now(),
                    callback: function(response) {
                        btn.textContent = "Verifying Payment...";
                        
                        // Call backend function to verify and update spreadsheet records
                        fetch('/.netlify/functions/verify-payment', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                reference: response.reference,
                                sessionId: sessionId,
                                phone: userData.phone
                            })
                        })
                        .then(res => res.json())
                        .then(resData => {
                            btn.textContent = "Unlock Full Blueprint";
                            btn.disabled = false;
                            
                            if (resData.success) {
                                localStorage.setItem('bga_paid', 'true');
                                applyLockState(true);
                                alert("Success! Your Growth Blueprint is fully unlocked.");
                                const scheduleCard = document.getElementById('bga-scheduling-card');
                                if (scheduleCard) {
                                    scheduleCard.scrollIntoView({ behavior: 'smooth' });
                                }
                            } else {
                                alert("Error verifying payment: " + (resData.error || "Please contact hello@builtiumco.com"));
                            }
                        })
                        .catch(err => {
                            btn.textContent = "Unlock Full Blueprint";
                            btn.disabled = false;
                            console.error("Verification error:", err);
                            alert("A network error occurred. Please contact support with reference: " + response.reference);
                        });
                    },
                    onClose: function() {
                        btn.textContent = "Unlock My Full Analytics + Call";
                        btn.disabled = false;
                        console.log('Payment window closed.');
                    }
                });
                handler.openIframe();
            });
        });

        // Setup Manual Call Scheduling Handoff Form
        const confirmPhoneInput = document.getElementById('bga-confirm-phone');
        const submitScheduleBtn = document.getElementById('bga-submit-schedule-btn');
        const scheduleSuccessMsg = document.getElementById('bga-schedule-success-msg');

        if (confirmPhoneInput && userData.phone) {
            confirmPhoneInput.value = userData.phone;
        }

        if (submitScheduleBtn) {
            submitScheduleBtn.replaceWith(submitScheduleBtn.cloneNode(true));
        }

        const refreshedScheduleBtn = document.getElementById('bga-submit-schedule-btn');
        if (refreshedScheduleBtn) {
            refreshedScheduleBtn.addEventListener('click', () => {
                const confirmedPhone = confirmPhoneInput.value.trim();
                if (confirmedPhone === "") {
                    confirmPhoneInput.style.borderColor = 'red';
                    return;
                }
                
                refreshedScheduleBtn.disabled = true;
                refreshedScheduleBtn.textContent = "Submitting...";

                // Notify backend of phone and final completion state
                fetch('/.netlify/functions/verify-payment', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        reference: 'MANUAL_CONFIRMED',
                        sessionId: sessionId,
                        phone: confirmedPhone
                    })
                })
                .then(res => res.json())
                .then(() => {
                    refreshedScheduleBtn.style.display = 'none';
                    confirmPhoneInput.disabled = true;
                    scheduleSuccessMsg.style.display = 'block';
                })
                .catch(err => {
                    console.error("Scheduling confirm error:", err);
                    refreshedScheduleBtn.disabled = false;
                    refreshedScheduleBtn.textContent = "Confirm & Request Schedule";
                });
            });
        }

        // Post completion results silently to Netlify Form for redundancy
        const hiddenForm = document.getElementById('bga-lead-form');
        if (hiddenForm) {
            document.getElementById('bga-hidden-name').value = userData.businessName;
            document.getElementById('bga-hidden-email').value = userData.email;
            document.getElementById('bga-hidden-score').value = `${totalPercentage}%`;
            document.getElementById('bga-hidden-level').value = activeStage.name;
            document.getElementById('bga-hidden-timestamp').value = new Date().toISOString();
            
            // Map individual section scores
            const parsedSectionScores = {};
            for (const key in scores) {
                parsedSectionScores[key] = `${scores[key]} / ${categoryMaxPoints[key]}`;
            }
            document.getElementById('bga-hidden-scores').value = JSON.stringify(parsedSectionScores);
            
            // Clean question answers map
            const parsedAnswers = quizData.map((q, idx) => {
                return {
                    question: q.question,
                    section: q.section,
                    answer: q.type === 'profile' ? answers[idx] : (answers[idx] ? answers[idx].text : null),
                    points: q.type === 'profile' ? null : (answers[idx] ? answers[idx].points : 0)
                };
            });
            document.getElementById('bga-hidden-answers').value = JSON.stringify(parsedAnswers);

            // Log completion to Sheet
            fetch('/.netlify/functions/audit-log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'update',
                    sessionId: sessionId,
                    data: {
                        type: 'completion',
                        paid: isAlreadyPaid,
                        finalResult: activeStage.name,
                        scores: scores
                    }
                })
            }).catch(err => console.error("Logging completion failed:", err));

            // Post Form silently to Netlify Forms
            const formData = new FormData(hiddenForm);
            fetch("/", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => console.log("BGA results saved successfully via Netlify Forms."))
            .catch(err => console.error("Error submitting BGA metrics to Netlify:", err));
        }
    }
});
