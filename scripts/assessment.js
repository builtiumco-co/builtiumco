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

    // --- Per-category display names (used in copy) ---
    const categoryDisplayNames = {
        PROFILE: 'Profile',
        DISCOVERABILITY: 'Discoverability',
        WEBSITE: 'Website',
        POSITIONING: 'Positioning',
        SOCIAL_PROOF: 'Social Proof',
        SOCIAL_MEDIA: 'Social Media',
        LEAD_CAPTURE: 'Lead Capture',
        RETENTION: 'Retention',
        LEGAL: 'Legal',
        COMPETITIVE: 'Competitive'
    };

    // Section 5: Top Strengths per-category lines
    const categoryStrengthLines = {
        PROFILE: 'Your business identity is clear and consistent.',
        DISCOVERABILITY: 'People can find you when they search.',
        WEBSITE: 'Your website gives visitors a strong first impression.',
        POSITIONING: "It's clear what you offer and who it's for.",
        SOCIAL_PROOF: 'Your reputation is working in your favor.',
        SOCIAL_MEDIA: 'Your presence is active and consistent.',
        LEAD_CAPTURE: "You're set up to capture interest, not lose it.",
        RETENTION: 'Customers have a reason to come back.',
        LEGAL: 'Your business is protected and compliant.',
        COMPETITIVE: 'You understand where you stand against competitors.'
    };

    // Section 6: Growth Opportunities per-category lines
    const categoryGapLines = {
        PROFILE: "Your business identity isn't landing clearly yet.",
        DISCOVERABILITY: "People are searching, but not finding you.",
        WEBSITE: "Your website isn't converting visitors into customers.",
        POSITIONING: "It's unclear what you offer or why it matters.",
        SOCIAL_PROOF: "You don't yet have enough trust signals visible.",
        SOCIAL_MEDIA: 'Your presence is inconsistent or inactive.',
        LEAD_CAPTURE: 'Interested visitors are leaving without a next step.',
        RETENTION: "Customers aren't coming back after their first visit.",
        LEGAL: 'Your business has exposure here that needs attention.',
        COMPETITIVE: "You don't have visibility into where you stand against competitors."
    };

    // Section 7: "What changes if you fix these" bullets per category
    const categoryFixBullets = {
        PROFILE: [
            'People recognize your business instantly',
            'Your identity feels consistent everywhere they find you',
            'First impressions build trust immediately'
        ],
        DISCOVERABILITY: [
            'More people find you through search',
            'You show up where your customers are already looking',
            'Less reliance on word-of-mouth alone'
        ],
        WEBSITE: [
            'Visitors trust you more on first visit',
            'People know exactly what you offer',
            'More visitors take action (call/book/inquire)'
        ],
        POSITIONING: [
            'Customers understand your value instantly',
            'You stand out from competitors offering similar things',
            'Pricing and offers feel justified, not confusing'
        ],
        SOCIAL_PROOF: [
            'New visitors trust you faster',
            'Reviews and testimonials do the selling for you',
            'Skepticism turns into confidence'
        ],
        SOCIAL_MEDIA: [
            'You stay visible between purchases',
            'Engagement turns into repeat interest',
            'Your brand feels active and current'
        ],
        LEAD_CAPTURE: [
            'Interested visitors don\'t slip away',
            'You can follow up instead of losing the lead',
            'More inquiries convert into paying customers'
        ],
        RETENTION: [
            'Customers come back more often',
            'Get more referrals automatically',
            'Increase lifetime customer value'
        ],
        LEGAL: [
            'Build customer trust and credibility',
            'Protect your business legally',
            'Meet industry compliance standards'
        ],
        COMPETITIVE: [
            'You know exactly where you stand',
            'You can act on gaps before competitors close them',
            'Decisions are based on facts, not guesses'
        ]
    };

    // Section 7: Icons per category
    const categoryIcons = {
        PROFILE: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
        DISCOVERABILITY: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
        WEBSITE: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>',
        POSITIONING: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="3"></circle></svg>',
        SOCIAL_PROOF: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>',
        SOCIAL_MEDIA: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>',
        LEAD_CAPTURE: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>',
        RETENTION: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
        LEGAL: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>',
        COMPETITIVE: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>'
    };

    // Section 8: Today vs Potential pairs
    const todayVsPotential = {
        PROFILE: { today: 'Inconsistent first impression', potential: 'Instantly recognizable identity' },
        DISCOVERABILITY: { today: 'Invisible in search', potential: 'Found by the right people' },
        WEBSITE: { today: 'Weak first impression', potential: 'Professional presence' },
        POSITIONING: { today: 'Unclear offer', potential: 'Strategic market position' },
        SOCIAL_PROOF: { today: 'Missing trust signals', potential: 'Established credibility' },
        SOCIAL_MEDIA: { today: 'Inactive presence', potential: 'Consistent engagement' },
        LEAD_CAPTURE: { today: 'Manual inquiries', potential: 'Automated leads' },
        RETENTION: { today: 'Low repeat business', potential: 'Loyal customer base' },
        LEGAL: { today: 'Compliance gaps', potential: 'Full legal compliance' },
        COMPETITIVE: { today: 'Unaware of competition', potential: 'Strategic market position' }
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
        
        const isFilled = (nameVal !== "" && emailVal !== "" && phoneVal !== "");
        startBtn.disabled = !isFilled;
    }

    if (bizNameInput && emailInput && phoneInput) {
        ['input', 'change', 'keyup', 'paste', 'blur', 'focus'].forEach(evt => {
            bizNameInput.addEventListener(evt, checkStartBtnState);
            emailInput.addEventListener(evt, checkStartBtnState);
            phoneInput.addEventListener(evt, checkStartBtnState);
        });
        checkStartBtnState();
        setTimeout(checkStartBtnState, 200);
        setTimeout(checkStartBtnState, 600);
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
            const nameVal = bizNameInput ? bizNameInput.value.trim() : '';
            const emailVal = emailInput ? emailInput.value.trim() : '';
            const phoneVal = phoneInput ? phoneInput.value.trim() : '';

            if (!nameVal || !emailVal || !phoneVal) {
                checkStartBtnState();
                if (startBtn && startBtn.disabled) {
                    alert("Please fill in your Business Name, Email Address, and Phone Number.");
                    return;
                }
            }

            userData.businessName = nameVal;
            userData.email = emailVal;
            userData.phone = phoneVal;
            
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
        progressText.textContent = `Section ${q.sectionNum} of 10 • ${currentProgressPercent}% Complete`;

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
            try {
                renderResultsReport(profilePoints);
            } catch (err) {
                console.error("Error rendering results report:", err);
            }
            showScreen(screenResults);
            localStorage.removeItem('bga_progress'); // Clean up progress
        }, 1500);
    }

    function renderResultsReport(profilePoints) {
        const isAlreadyPaid = localStorage.getItem('bga_paid') === 'true';
        const categories = Object.keys(categoryMaxPoints);

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

        // Category "why it matters" explanations (used in gaps section)
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

        // Maturity Stages — 5-stage model per spec section 3
        const stagesInfo = [
            {
                name: "Invisible",
                subtext: "Barely discoverable online.",
                rank: "01 / 05",
                bullets: [
                    "You are not visible in local search",
                    "You have no central website storefront",
                    "You rely entirely on manual offline efforts"
                ],
                nextStage: "Present",
                nextSubtext: "You exist online, but passively.",
                nextBullets: [
                    "Basic website and listings set up",
                    "Found by name, if not by service",
                    "Clear baseline profiles created"
                ],
                patternQuote: "Businesses at this stage are digitally locked out of the market — prospects cannot confirm they exist."
            },
            {
                name: "Present",
                subtext: "You exist online, but passively.",
                rank: "02 / 05",
                bullets: [
                    "You are found by name, not by service",
                    "Your website is basic or outdated",
                    "Your profiles lack active postings"
                ],
                nextStage: "Credible",
                nextSubtext: "You look legitimate, and convert occasionally.",
                nextBullets: [
                    "Consistent professional design language",
                    "Clear value proposition and positioning",
                    "Active reviews and social proof visible"
                ],
                patternQuote: "Present but silent. Traffic arrives but leaves immediately because the credibility bar isn't met."
            },
            {
                name: "Credible",
                subtext: "You look legitimate, and convert occasionally.",
                rank: "03 / 05",
                bullets: [
                    "You look professional at a glance",
                    "You convert when someone is already sold",
                    "You depend on referrals and word of mouth"
                ],
                nextStage: "Growing",
                nextSubtext: "Systems are in place, traction is consistent.",
                nextBullets: [
                    "A structured content and channel rhythm",
                    "Lead capture and follow-up wired together",
                    "Traffic that returns, not just arrives"
                ],
                patternQuote: "Businesses at this stage look credible but almost none have set up retention — most traffic never returns."
            },
            {
                name: "Growing",
                subtext: "Systems are in place, traction is consistent.",
                rank: "04 / 05",
                bullets: [
                    "Your content has rhythmic channels",
                    "You capture lead information systematically",
                    "Some traffic returns automatically"
                ],
                nextStage: "Compounding",
                nextSubtext: "You have a retention and referral engine working for you.",
                nextBullets: [
                    "Full loop automation across channels",
                    "Strong brand referrals and authority",
                    "Multi-channel retention and loyalty"
                ],
                patternQuote: "Traction is active, but friction in lead capture or checkout leaks up to 30% of potential conversions."
            },
            {
                name: "Compounding",
                subtext: "You have a retention and referral engine working for you.",
                rank: "05 / 05",
                bullets: [
                    "You dominate local discoverability",
                    "Your web conversions are automated",
                    "You retain and grow customer lifetime value"
                ],
                nextStage: "Elite",
                nextSubtext: "Ongoing growth supremacy.",
                nextBullets: [
                    "Continuous CRO tests running monthly",
                    "Active category expansion strategies"
                ],
                patternQuote: "Market leader status is achieved, but stay disciplined — competitor updates happen fast."
            }
        ];

        // Section 3 stage threshold — spec: 0-20 Invisible, 21-40 Present, 41-60 Credible, 61-80 Growing, 81-100 Compounding
        let activeStageIndex;
        if (totalPercentage <= 20) activeStageIndex = 0;
        else if (totalPercentage <= 40) activeStageIndex = 1;
        else if (totalPercentage <= 60) activeStageIndex = 2;
        else if (totalPercentage <= 80) activeStageIndex = 3;
        else activeStageIndex = 4;

        const activeStage = stagesInfo[activeStageIndex];

        // Section 9: Calculate Estimated Potential Score
        const potentialScore = Math.min(Math.round(totalPercentage + (100 - totalPercentage) * 0.6), 92);

        // Section 3: Render Stage Header — stage name large, subtext below, score as secondary detail
        document.getElementById('bga-stage-rank').textContent = activeStage.rank;
        document.getElementById('bga-stage-title').textContent = activeStage.name + ".";
        const stageSubtextEl = document.getElementById('bga-stage-subtext');
        if (stageSubtextEl) stageSubtextEl.textContent = activeStage.subtext;
        const stageScoreEl = document.getElementById('bga-stage-score-label');
        if (stageScoreEl) stageScoreEl.textContent = `${totalPercentage}% Growth Score`;
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

        // Identify sorted categories (lowest → highest) for all 10
        const sortedCats = categories.map(cat => {
            const scoreVal = scores[cat] || 0;
            const maxVal = categoryMaxPoints[cat];
            return {
                name: cat,
                displayName: categoryDisplayNames[cat] || cat,
                percentage: Math.round((scoreVal / maxVal) * 100)
            };
        }).sort((a, b) => a.percentage - b.percentage);

        const top3Gaps = sortedCats.slice(0, 3);
        const top3Strengths = [...sortedCats].sort((a, b) => b.percentage - a.percentage).slice(0, 3);

        // Section 4: Synthesized diagnostic sentence from bottom-3 category display names
        const diagSentence = `Your ${top3Gaps[0].displayName}, ${top3Gaps[1].displayName}, and ${top3Gaps[2].displayName} are the areas holding your growth back most right now.`;
        document.getElementById('bga-stage-desc').textContent = diagSentence;

        // Render SECTION 01: All 10 Category scores with animated bars + per-category lines
        const breakdownListEl = document.getElementById('bga-breakdown-list');
        if (breakdownListEl) {
            breakdownListEl.innerHTML = '';
            sortedCats.slice().sort((a, b) => b.percentage - a.percentage).forEach((cat, i) => {
                const isGap = top3Gaps.some(g => g.name === cat.name);
                const line = isGap ? (categoryGapLines[cat.name] || '') : (categoryStrengthLines[cat.name] || '');
                const barColor = isGap ? '#ef4444' : '#3a7bff';

                const row = document.createElement('div');
                row.style.padding = '18px 0';
                row.style.borderBottom = '1px solid #f1f5f9';
                row.innerHTML = `
                    <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px;">
                        <span style="font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:15px;color:#0f172a;">${cat.displayName}</span>
                        <span style="font-family:'JetBrains Mono',monospace;font-weight:700;font-size:13px;color:${barColor};">${cat.percentage}%</span>
                    </div>
                    <div style="height:4px;background:#f1f5f9;border-radius:2px;overflow:hidden;margin-bottom:8px;">
                        <div class="bga-result-bar-fill" data-target="${cat.percentage}" style="height:100%;width:0%;background:${barColor};border-radius:2px;transition:width 1.2s cubic-bezier(0.4,0,0.2,1);transition-delay:${i * 0.07}s;"></div>
                    </div>
                    <p style="font-size:12px;color:#94a3b8;margin:0;line-height:1.4;">${line}</p>
                `;
                breakdownListEl.appendChild(row);
            });

            // Animate bars when the breakdown section scrolls into view
            const barObserver = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.querySelectorAll('.bga-result-bar-fill').forEach(fill => {
                            const target = fill.getAttribute('data-target');
                            setTimeout(() => { fill.style.width = target + '%'; }, 80);
                        });
                        obs.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            barObserver.observe(breakdownListEl);
        }

        // Render SECTION 02: 3 Leverage Gaps (section 6 per-category lines)
        const gapsListEl = document.getElementById('bga-gaps-list');
        if (gapsListEl) {
            gapsListEl.innerHTML = '';
            top3Gaps.forEach((gap, idx) => {
                const gapLine = categoryGapLines[gap.name] || '';
                const whyText = categoryWhyMatters[gap.name] || '';
                const bullets = categoryFixBullets[gap.name] || [];
                const icon = categoryIcons[gap.name] || '';

                const gapItem = document.createElement('div');
                gapItem.style.borderBottom = '1px solid #e2e8f0';
                gapItem.style.paddingBottom = '40px';
                gapItem.innerHTML = `
                    <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px;">
                        <span style="font-family:'JetBrains Mono',monospace;font-size:13px;color:#3a7bff;font-weight:700;">0${idx+1}</span>
                        <span style="color:#3a7bff;">${icon}</span>
                        <span style="font-family:'Space Grotesk',sans-serif;font-size:20px;font-weight:700;color:#000;">${gap.displayName}</span>
                        <span style="font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:700;color:#ef4444;margin-left:auto;">${gap.percentage}%</span>
                    </div>
                    <p style="font-size:15px;color:#334155;font-weight:500;line-height:1.6;margin:0 0 12px 0;">
                        ${gapLine}
                    </p>
                    <p style="font-size:13px;color:#64748b;line-height:1.5;margin:0 0 16px 0;">
                        Why it matters &mdash; ${whyText}
                    </p>
                    ${bullets.length ? `
                    <div style="margin-top:12px;">
                        <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.2em;color:#94a3b8;text-transform:uppercase;margin-bottom:10px;">WHAT CHANGES IF YOU FIX THIS</div>
                        <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:8px;">
                            ${bullets.map(b => `
                            <li style="display:flex;gap:10px;align-items:baseline;font-size:14px;color:#475569;font-weight:500;">
                                <span style="color:#3a7bff;flex-shrink:0;">&#43;</span>
                                <span>${b}</span>
                            </li>`).join('')}
                        </ul>
                    </div>` : ''}
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
                const gapLine = categoryGapLines[gap.name] || '';
                const unlocksMsg = nextGap ? `UNLOCKS &rarr; ${nextGap.displayName.toUpperCase()}` : '';

                const stepItem = document.createElement('div');
                stepItem.style.display = 'flex';
                stepItem.style.gap = '20px';
                stepItem.style.alignItems = 'flex-start';
                stepItem.innerHTML = `
                    <div style="border:2px solid #000;padding:6px 12px;font-family:'Space Grotesk',sans-serif;font-weight:700;font-size:16px;line-height:1;color:#000;margin-top:2px;flex-shrink:0;">
                        ${idx + 1}
                    </div>
                    <div>
                        <h4 style="font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:700;color:#000;margin-bottom:8px;">${gap.displayName}</h4>
                        <p style="font-size:15px;color:#64748b;line-height:1.5;margin:0 0 10px 0;font-weight:500;">${gapLine}</p>
                        ${unlocksMsg ? `<div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.05em;color:#3a7bff;font-weight:700;text-transform:uppercase;">${unlocksMsg}</div>` : ''}
                    </div>
                `;
                roadmapListEl.appendChild(stepItem);
            });
        }

        // Section 8: Render "Your Business: Today vs. Potential" — dynamic from bottom-5 categories
        const bottom5 = sortedCats.slice(0, 5);
        const detailsGridEl = document.getElementById('bga-stage-details-grid');
        if (detailsGridEl) {
            const todayItems = bottom5.map(c => todayVsPotential[c.name]?.today || c.displayName).join('</li><li style="display:flex;gap:12px;font-size:14px;color:#475569;font-weight:500;align-items:baseline;"><span style="color:#ef4444;font-family:monospace;">—</span><span>');
            const potentialItems = bottom5.map(c => todayVsPotential[c.name]?.potential || c.displayName).join('</li><li style="display:flex;gap:12px;font-size:14px;color:#475569;font-weight:500;align-items:baseline;"><span style="color:#10b981;font-family:monospace;">+</span><span>');
            detailsGridEl.style.gridTemplateColumns = 'repeat(2, 1fr)';
            detailsGridEl.innerHTML = `
                <div style="border-right:1px solid #f1f5f9;padding-right:32px;">
                    <div class="mono-small" style="color:#64748b;margin-bottom:8px;">TODAY</div>
                    <h3 style="font-family:'Space Grotesk',sans-serif;font-size:24px;font-weight:700;margin-bottom:20px;color:#000;">${activeStage.name}</h3>
                    <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:14px;">
                        <li style="display:flex;gap:12px;font-size:14px;color:#475569;font-weight:500;align-items:baseline;"><span style="color:#ef4444;font-family:monospace;">—</span><span>${todayItems}</span></li>
                    </ul>
                </div>
                <div style="padding-left:32px;">
                    <div class="mono-small" style="color:#64748b;margin-bottom:8px;">POTENTIAL</div>
                    <h3 style="font-family:'Space Grotesk',sans-serif;font-size:24px;font-weight:700;margin-bottom:8px;color:#3a7bff;">${potentialScore}%</h3>
                    <p style="font-family:'JetBrains Mono',monospace;font-size:11px;color:#94a3b8;letter-spacing:0.1em;text-transform:uppercase;margin:0 0 20px 0;">Estimated Potential Score</p>
                    <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:14px;">
                        <li style="display:flex;gap:12px;font-size:14px;color:#475569;font-weight:500;align-items:baseline;"><span style="color:#10b981;font-family:monospace;">+</span><span>${potentialItems}</span></li>
                    </ul>
                </div>
            `;
        }

        // Render Pattern quote
        const patternBlockEl = document.getElementById('bga-pattern-block');
        if (patternBlockEl) {
            patternBlockEl.innerHTML = `
                <div class="mono-small" style="color:#64748b;margin-bottom:16px;">PATTERN</div>
                <blockquote style="font-family:'Space Grotesk',sans-serif;font-size:24px;font-weight:600;line-height:1.45;color:#0f172a;border-left:none;padding-left:0;margin:0 0 16px 0;">
                    &ldquo;${activeStage.patternQuote}&rdquo;
                </blockquote>
                <p style="font-family:'JetBrains Mono',monospace;font-size:10px;color:#94a3b8;letter-spacing:0.1em;text-transform:uppercase;margin:0;">
                    PATTERN-LEVEL OBSERVATION ACROSS BUSINESSES AT STAGE ${activeStageIndex + 1}. NOT A CLAIM ABOUT ANY SPECIFIC COMPETITOR.
                </p>
            `;
        }

        // Section 10 + 11: Render Trust Stat + ₦5,000 Unlock Offer above paywall
        const trustStatEl = document.getElementById('bga-trust-stat');
        if (trustStatEl) {
            trustStatEl.innerHTML = `
                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                    <span style="font-family:'JetBrains Mono',monospace;font-size:36px;font-weight:700;color:#3a7bff;">50+</span>
                    <p style="font-size:15px;color:#475569;line-height:1.6;max-width:52ch;margin:0;">businesses have taken our free Growth Score. Many didn't stop there — they came back for branding, web, and content support too.</p>
                </div>
            `;
        }

        // Populate the review line under results header
        const reviewLineEl = document.getElementById('bga-review-line');
        if (reviewLineEl) reviewLineEl.textContent = `Based on our review of ${userData.businessName || 'your business'}`;

        // Populate report closing footer
        const closingBusinessEl = document.getElementById('bga-closing-business');
        if (closingBusinessEl) closingBusinessEl.textContent = `This report was generated for ${userData.businessName || 'your business'} by Builtium.`;

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
            const unlockOffer = document.getElementById('bga-unlock-offer');
            const unlockPaidConfirm = document.getElementById('bga-unlock-paid-confirm');

            if (isPaid) {
                if (breakdownLock) breakdownLock.style.display = 'none';
                if (breakdownList) breakdownList.classList.remove('bga-paywall-blur');
                if (roadmapLock) roadmapLock.style.display = 'none';
                if (roadmapList) roadmapList.classList.remove('bga-paywall-blur');
                if (partnershipLock) partnershipLock.style.display = 'none';
                if (partnershipEl) partnershipEl.classList.remove('bga-paywall-blur');
                if (schedulingCard) schedulingCard.style.display = 'block';
                if (upsellCard) upsellCard.style.display = 'none';
                if (unlockOffer) unlockOffer.style.display = 'none';
                if (unlockPaidConfirm) unlockPaidConfirm.style.display = 'block';
            } else {
                if (breakdownLock) breakdownLock.style.display = 'flex';
                if (breakdownList) breakdownList.classList.add('bga-paywall-blur');
                if (roadmapLock) roadmapLock.style.display = 'flex';
                if (roadmapList) roadmapList.classList.add('bga-paywall-blur');
                if (partnershipLock) partnershipLock.style.display = 'flex';
                if (partnershipEl) partnershipEl.classList.add('bga-paywall-blur');
                if (schedulingCard) schedulingCard.style.display = 'none';
                if (upsellCard) upsellCard.style.display = 'none'; // Use new unlock offer section instead
                if (unlockOffer) unlockOffer.style.display = 'block';
            }
        }

        const isAlreadyPaid = localStorage.getItem('bga_paid') === 'true';
        applyLockState(isAlreadyPaid);

        // Dismiss unlock offer ("Continue with free results")
        const dismissUnlockBtn = document.getElementById('bga-dismiss-unlock');
        if (dismissUnlockBtn) {
            dismissUnlockBtn.addEventListener('click', () => {
                const unlockOffer = document.getElementById('bga-unlock-offer');
                if (unlockOffer) unlockOffer.style.display = 'none';
            });
        }

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
                    amount: 500 * 100, // ₦500 in kobo
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
                                submitHiddenForm(true);
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

        // Function to submit ALL 55 answers + metadata to Netlify Forms & Function
        function submitHiddenForm(isPaidStatus = false) {
            const hiddenForm = document.getElementById('bga-lead-form');
            if (!hiddenForm) return;

            const setVal = (id, val) => {
                const el = document.getElementById(id);
                if (el) el.value = val || '';
            };

            setVal('bga-hidden-name', userData.businessName);
            setVal('bga-hidden-email', userData.email);
            setVal('bga-hidden-phone', userData.phone);
            setVal('bga-hidden-industry', userData.industry);
            setVal('bga-hidden-location', userData.location);
            setVal('bga-hidden-years', userData.yearsInBusiness);
            setVal('bga-hidden-employees', userData.employeesCount);
            setVal('bga-hidden-website', userData.websiteUrl);
            setVal('bga-hidden-socials', Array.isArray(userData.socialPlatforms) ? userData.socialPlatforms.join(', ') : (userData.socialPlatforms || ''));
            setVal('bga-hidden-score', `${totalPercentage}%`);
            setVal('bga-hidden-level', activeStage ? activeStage.name : '');
            setVal('bga-hidden-timestamp', new Date().toISOString());

            // Map individual section scores
            const parsedSectionScores = {};
            for (const key in scores) {
                parsedSectionScores[key] = `${scores[key]} / ${categoryMaxPoints[key]}`;
            }
            setVal('bga-hidden-scores', JSON.stringify(parsedSectionScores));

            // Map ALL 55 questions + answers + points
            const parsedAnswers = quizData.map((q, idx) => {
                const userAns = answers[idx];
                let ansText = '';
                let pts = 0;
                if (q.type === 'profile') {
                    ansText = typeof userAns === 'object' ? JSON.stringify(userAns) : (userAns || '');
                    pts = null;
                } else {
                    if (userAns && userAns.text) {
                        ansText = userAns.text;
                        pts = userAns.points || 0;
                    } else if (typeof userAns === 'string') {
                        ansText = userAns;
                    } else {
                        ansText = 'Not answered';
                    }
                }
                return {
                    qNum: idx + 1,
                    section: q.section,
                    question: q.question,
                    answer: ansText,
                    points: pts
                };
            });
            setVal('bga-hidden-answers', JSON.stringify(parsedAnswers));

            // Log completion to Google Sheets via Netlify Function
            fetch('/.netlify/functions/audit-log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'update',
                    sessionId: sessionId,
                    data: {
                        type: 'completion',
                        paid: isPaidStatus,
                        finalResult: activeStage ? activeStage.name : '',
                        scores: scores,
                        answers: parsedAnswers
                    }
                })
            }).catch(err => console.error("Logging completion failed:", err));

            // Post Form silently to Netlify Forms endpoint
            try {
                const formData = new FormData(hiddenForm);
                if (!formData.has('form-name')) {
                    formData.append('form-name', 'bga-results');
                }
                const searchParams = new URLSearchParams();
                for (const [key, value] of formData.entries()) {
                    searchParams.append(key, value);
                }
                fetch("/", {
                    method: "POST",
                    headers: { "Content-Type": "application/x-www-form-urlencoded" },
                    body: searchParams.toString()
                })
                .then(() => console.log("All 55 answers + metadata successfully submitted to Netlify Forms."))
                .catch(err => console.error("Error submitting BGA metrics to Netlify:", err));
            } catch (err) {
                console.error("Error constructing FormData for Netlify Forms:", err);
            }
        }

        // Trigger hidden submission upon report generation
        submitHiddenForm(isAlreadyPaid);
    }

    // --- Moniepoint Payment Flow & Verification Modal Setup ---

    // Copy to clipboard functionality for Moniepoint details
    document.querySelectorAll('.bga-copy-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const textToCopy = this.getAttribute('data-copy');
            if (!textToCopy) return;

            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalHtml = this.innerHTML;
                this.classList.add('copied');
                this.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Copied!
                `;
                setTimeout(() => {
                    this.classList.remove('copied');
                    this.innerHTML = originalHtml;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy:', err);
                alert('Failed to copy. Please copy manually.');
            });
        });
    });

    // When user clicks "I've Paid, Verify My Payment"
    const paidBtn = document.getElementById('bga-payment-paid-btn');
    const paymentModal = document.getElementById('bga-payment-form-modal');
    const paymentOverlay = document.getElementById('bga-payment-form-overlay');
    const paymentCloseBtn = document.getElementById('bga-payment-form-close');

    if (paidBtn && paymentModal) {
        paidBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // Pre-fill name and email from assessment data
            const nameInput = document.getElementById('payment-name');
            const emailInput = document.getElementById('payment-email');
            const subDateInput = document.getElementById('payment-submission-date');

            if (nameInput) nameInput.value = userData.businessName || '';
            if (emailInput) emailInput.value = userData.email || '';
            if (subDateInput) subDateInput.value = new Date().toLocaleDateString();

            // Open modal
            paymentModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    }

    // Function to close payment verification modal
    function closePaymentModal() {
        if (paymentModal) {
            paymentModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    if (paymentCloseBtn) paymentCloseBtn.addEventListener('click', closePaymentModal);
    if (paymentOverlay) paymentOverlay.addEventListener('click', closePaymentModal);

    // File upload preview trigger & display
    const fileUploadContainer = document.querySelector('.bga-file-upload');
    const fileInput = document.getElementById('payment-receipt');

    if (fileUploadContainer && fileInput) {
        fileUploadContainer.addEventListener('click', (e) => {
            if (e.target !== fileInput) {
                fileInput.click();
            }
        });

        fileInput.addEventListener('change', function() {
            if (this.files && this.files.length > 0) {
                fileUploadContainer.classList.add('has-file');
                const placeholderP = fileUploadContainer.querySelector('.bga-file-upload__placeholder p');
                if (placeholderP) placeholderP.textContent = 'Selected: ' + this.files[0].name;
            }
        });
    }

    // Payment verification form submission handler
    const verificationForm = document.querySelector('form[name="payment-verification"]');
    const thankYouScreen = document.getElementById('bga-payment-thank-you');

    if (verificationForm) {
        verificationForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = document.getElementById('bga-payment-submit');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = "Submitting Verification...";
            }

            // Submit FormData to Netlify Forms endpoint
            const formData = new FormData(verificationForm);
            fetch('/', {
                method: 'POST',
                body: formData
            })
            .then(() => {
                closePaymentModal();
                showPaymentThankYou();
            })
            .catch(err => {
                console.error("Payment verification submission error:", err);
                closePaymentModal();
                showPaymentThankYou(); // Show thank you as fallback
            });
        });
    }

    function showPaymentThankYou() {
        // Mark paid status in localStorage
        localStorage.setItem('bga_paid', 'true');

        if (thankYouScreen) {
            thankYouScreen.classList.add('active');
            thankYouScreen.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    // Thank You screen "Back to Home" button
    const thankYouHomeBtn = document.getElementById('bga-thank-you-home-btn');
    if (thankYouHomeBtn) {
        thankYouHomeBtn.addEventListener('click', () => {
            window.location.href = '/';
        });
    }
});
