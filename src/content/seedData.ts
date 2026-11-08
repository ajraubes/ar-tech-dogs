/**
 * Starting content for AR Tech Dogs, taken from the company & website project plan.
 * `pnpm seed` copies this into Payload. After that, Payload is the source of truth:
 * edit content in the admin panel, not here.
 *
 * Prices are the plan's proposed launch prices (ZAR, starting prices). They are
 * commercial assumptions and must be reviewed before the site goes live.
 */

export type SeedService = {
  slug: string
  number: string
  title: string
  shortTitle: string
  division: 'custom' | 'shopify' | 'enterprise' | 'business' | 'landing' | 'support'
  core: boolean
  summary: string
  heroHeading: string
  overview: string
  audience: string[]
  problems: { title: string; description: string }[]
  features: string[]
  deliverables: string[]
  technologies: string[]
  faqs: { question: string; answer: string }[]
}

export const services: SeedService[] = [
  {
    slug: 'custom-web-development',
    number: '01',
    title: 'Custom Web Development',
    shortTitle: 'Custom Web',
    division: 'custom',
    core: true,
    summary: 'Next.js, React, Payload CMS, custom integrations and web applications.',
    heroHeading: 'Custom platforms, engineered for what comes next.',
    overview:
      'We build fast, maintainable websites and web applications on Next.js, React and Payload CMS. You get a platform your team can edit without a developer, built on a codebase a developer will be happy to inherit.',
    audience: [
      'Growing businesses that have outgrown a page builder',
      'Companies that need content editing without code changes',
      'Teams that need integrations with existing systems',
      'Agencies that need a senior technical partner',
    ],
    problems: [
      {
        title: 'Slow, fragile sites',
        description:
          'Plugin-heavy builds that break on update and fail Core Web Vitals. We build lean, typed and tested.',
      },
      {
        title: 'Locked-in content',
        description:
          'Every copy change needs a developer. Payload CMS gives your team structured, safe editing.',
      },
      {
        title: 'Disconnected systems',
        description:
          'Data copied by hand between tools. We connect your site to the APIs your business runs on.',
      },
    ],
    features: [
      'Custom Next.js and React development',
      'Payload CMS with structured content collections',
      'REST API and webhook integrations',
      'Server-side rendering and static generation',
      'Technical SEO and structured data',
      'Performance optimisation',
      'Website migrations',
      'Web applications and portals',
    ],
    deliverables: [
      'Technical specification',
      'Production-ready codebase in your GitHub',
      'Configured CMS with editor training',
      'Deployment to Vercel or a managed VPS',
      'Handover documentation',
    ],
    technologies: ['Next.js', 'React', 'TypeScript', 'Payload CMS', 'PostgreSQL', 'Tailwind CSS'],
    faqs: [
      {
        question: 'Do I own the code?',
        answer:
          'Yes. The repository, domain and platform accounts are yours. We work in your GitHub organisation or transfer it at handover.',
      },
      {
        question: 'Why Payload CMS instead of WordPress?',
        answer:
          'Payload is TypeScript-native, runs inside the Next.js app, and keeps content structured. That means fewer plugins, fewer security patches and a faster site.',
      },
      {
        question: 'Can you take over an existing project?',
        answer:
          'Usually, yes. We start with a short technical review so we can tell you honestly what is worth keeping.',
      },
    ],
  },
  {
    slug: 'shopify-development',
    number: '02',
    title: 'Shopify Development',
    shortTitle: 'Shopify',
    division: 'shopify',
    core: true,
    summary: 'Shopify store builds, redesigns, migrations, custom Liquid and ongoing development.',
    heroHeading: 'Shopify stores built by a senior Shopify developer.',
    overview:
      'From a first store to a complex catalogue, we build Shopify themes, sections and integrations that convert and stay maintainable. Senior Shopify and Liquid experience, without agency overhead.',
    audience: [
      'New brands launching their first store',
      'Growing retailers that need custom functionality',
      'Established brands migrating from Magento or WooCommerce',
    ],
    problems: [
      {
        title: 'Theme limitations',
        description:
          'Off-the-shelf themes that cannot show your products properly. We build custom Liquid sections and templates.',
      },
      {
        title: 'App overload',
        description:
          'Ten apps doing what one well-built section could. We remove bloat and speed up the store.',
      },
      {
        title: 'Messy catalogues',
        description:
          'Variants and data that do not fit. We design metafield and metaobject architecture that scales.',
      },
    ],
    features: [
      'New Shopify store development',
      'Custom theme development and customisation',
      'Custom Liquid sections',
      'Metafields and metaobjects',
      'Product catalogue architecture',
      'App, payment and shipping integrations',
      'Store migrations',
      'Performance optimisation',
    ],
    deliverables: [
      'Configured Shopify store',
      'Custom theme or theme customisations',
      'Product and collection templates',
      'Payment and shipping setup',
      'Launch support',
    ],
    technologies: ['Shopify', 'Liquid', 'JavaScript', 'Shopify APIs', 'PayFast', 'Yoco'],
    faqs: [
      {
        question: 'Are Shopify fees included?',
        answer:
          'No. Shopify subscriptions, paid apps and premium themes are billed by those providers and quoted separately.',
      },
      {
        question: 'Which South African payment gateways do you support?',
        answer:
          'We set up PayFast, Peach Payments, Yoco and other gateways Shopify supports in your market.',
      },
    ],
  },
  {
    slug: 'shopify-plus-enterprise',
    number: '03',
    title: 'Shopify Plus & Enterprise',
    shortTitle: 'Shopify Plus',
    division: 'enterprise',
    core: false,
    summary:
      'Complex eCommerce architecture, integrations, multi-market setups and enterprise development.',
    heroHeading: 'Enterprise commerce without enterprise overhead.',
    overview:
      'Shopify Plus implementations, multi-market architecture, ERP and inventory integrations, and headless commerce where it is justified. Senior-led delivery for retailers with real operational complexity.',
    audience: [
      'Established retailers on or moving to Shopify Plus',
      'Brands selling across multiple markets',
      'Businesses that need ERP, inventory or B2B integration',
    ],
    problems: [
      {
        title: 'Operational complexity',
        description:
          'Stock, pricing and orders spread across systems. We build integrations and middleware that keep them in sync.',
      },
      {
        title: 'Multi-market sprawl',
        description:
          'Separate stores that drift apart. We design multi-market and multi-store architecture you can manage.',
      },
      {
        title: 'Manual workflows',
        description: 'Teams doing by hand what Shopify Flow and automation can do reliably.',
      },
    ],
    features: [
      'Shopify Plus implementations',
      'Enterprise storefront development',
      'Shopify Flow automation',
      'Multi-market development',
      'B2B commerce functionality',
      'ERP and inventory integrations',
      'Custom APIs and middleware',
      'Headless commerce where justified',
    ],
    deliverables: [
      'Discovery and technical architecture',
      'Integration specification',
      'Staged rollout plan',
      'Dedicated technical support during rollout',
    ],
    technologies: ['Shopify Plus', 'Shopify Flow', 'Shopify APIs', 'Next.js', 'AWS', 'Webhooks'],
    faqs: [
      {
        question: 'Are you an official Shopify Plus Partner?',
        answer:
          'No. We offer Shopify Plus development based on hands-on experience with Plus stores. We will say so clearly if that changes.',
      },
      {
        question: 'How are enterprise projects billed?',
        answer:
          'Milestone billing based on the scope and length of the engagement, agreed in the proposal.',
      },
    ],
  },
  {
    slug: 'business-websites',
    number: '04',
    title: 'Business Websites',
    shortTitle: 'Business Websites',
    division: 'business',
    core: false,
    summary: 'Corporate websites, informational websites and service provider websites.',
    heroHeading: 'A professional website your team can run.',
    overview:
      'Custom-designed business websites built on Next.js and Payload CMS. Fast, accessible, easy to update, and designed to turn visitors into enquiries.',
    audience: [
      'Small and medium businesses',
      'Professional service providers',
      'Companies replacing a dated website',
    ],
    problems: [
      {
        title: 'Dated presence',
        description:
          'A website that undersells the business. We design to match the quality of your work.',
      },
      {
        title: 'No enquiries',
        description: 'Traffic with no conversion. We design clear journeys to a qualified enquiry.',
      },
    ],
    features: [
      'Custom design and development',
      'Payload CMS editing',
      'Contact forms and enquiries',
      'Technical SEO foundations',
      'Analytics integration',
      'Performance optimisation',
    ],
    deliverables: ['Designed and built website', 'CMS training', 'Deployment and domain setup'],
    technologies: ['Next.js', 'Payload CMS', 'Tailwind CSS', 'Vercel', 'Cloudflare'],
    faqs: [
      {
        question: 'How long does a business website take?',
        answer:
          'Most business websites take four to eight weeks, depending on content readiness and the number of pages.',
      },
    ],
  },
  {
    slug: 'landing-pages',
    number: '05',
    title: 'Landing Pages & One-Pagers',
    shortTitle: 'Landing Pages',
    division: 'landing',
    core: false,
    summary: 'Focused, conversion-led pages for launches, campaigns and lead generation.',
    heroHeading: 'One page. One goal. Built to convert.',
    overview:
      'A landing page is a focused conversion tool, not a cheap website. We build fast pages with clear calls to action, lead capture and campaign tracking.',
    audience: ['Startups', 'Product launches', 'Marketing campaigns', 'Events'],
    problems: [
      {
        title: 'Campaigns that leak',
        description:
          'Paid traffic sent to a generic homepage. We build pages with one clear next step.',
      },
    ],
    features: [
      'Lead generation forms',
      'WhatsApp integration',
      'Google Maps',
      'Testimonials',
      'Analytics and campaign tracking',
      'Custom animations',
      'SEO foundations',
    ],
    deliverables: ['Designed and built landing page', 'Tracking setup', 'Deployment'],
    technologies: ['Next.js', 'Tailwind CSS', 'Google Analytics', 'Vercel'],
    faqs: [
      {
        question: 'Can a landing page grow into a full website later?',
        answer:
          'Yes. It is built on the same stack, so it can grow into a full site without a rebuild.',
      },
    ],
  },
  {
    slug: 'support-and-maintenance',
    number: '06',
    title: 'Ongoing Support & Growth',
    shortTitle: 'Support',
    division: 'support',
    core: false,
    summary:
      'Maintenance, performance optimisation, technical support, feature development and retainers.',
    heroHeading: 'A development partner after launch.',
    overview:
      'Monthly care and development retainers with a fixed number of included hours, clear response times and no surprises. For Shopify stores and custom websites.',
    audience: ['Businesses with a live website or store', 'Teams without an in-house developer'],
    problems: [
      {
        title: 'Nobody to call',
        description: 'Something breaks and the original developer is gone. We stay on.',
      },
      {
        title: 'Slow decay',
        description: 'Dependencies age and speed drops. We keep the platform updated and fast.',
      },
    ],
    features: [
      'Software and dependency updates',
      'Website monitoring',
      'Backups where applicable',
      'Bug fixes',
      'Small content changes',
      'Shopify theme updates',
      'Performance checks',
      'Development requests',
    ],
    deliverables: ['Monthly report', 'Agreed response times', 'Included development hours'],
    technologies: ['GitHub', 'Vercel', 'Cloudflare', 'Shopify'],
    faqs: [
      {
        question: 'What happens to unused hours?',
        answer:
          'Unused hours do not roll over unless agreed in writing. Additional work is billed at the agreed hourly rate.',
      },
      {
        question: 'Is hosting included?',
        answer: 'No. Hosting, domains and third-party subscriptions are billed separately.',
      },
    ],
  },
]

export type SeedPackage = {
  service: string
  name: string
  tier: string
  price: number | null
  orMore: boolean
  billing: 'once-off' | 'monthly' | 'custom'
  description: string
  includesPrevious?: string
  features: string[]
  featured?: boolean
}

export const packages: SeedPackage[] = [
  // Business websites
  {
    service: 'business-websites',
    name: 'Starter Website',
    tier: '01 · Entry level',
    price: 8500,
    orMore: false,
    billing: 'once-off',
    description: 'A professional one-page website for small businesses, freelancers and startups.',
    features: [
      'One-page responsive website',
      'Custom design and branding alignment',
      'Hero, services, about and contact sections',
      'Contact form',
      'Basic SEO setup',
      'Deployment and domain configuration',
    ],
  },
  {
    service: 'business-websites',
    name: 'Business Website',
    tier: '02 · Most popular',
    price: 18500,
    orMore: false,
    billing: 'once-off',
    featured: true,
    description: 'A complete business website with editable content.',
    features: [
      'Up to 8 pages',
      'Custom Next.js design and development',
      'Payload CMS integration',
      'Contact forms and enquiries',
      'Basic technical SEO',
      'Analytics integration',
      'Deployment and training',
    ],
  },
  {
    service: 'business-websites',
    name: 'Professional Website',
    tier: '03 · Advanced',
    price: 35000,
    orMore: true,
    billing: 'once-off',
    description: 'A scalable, feature-rich website for established businesses.',
    features: [
      'Up to 15 pages',
      'Advanced Payload CMS architecture',
      'Custom content collections',
      'Advanced animations and interactions',
      'API integrations',
      'Advanced SEO and structured data',
      'CMS training and handover',
    ],
  },
  // Shopify
  {
    service: 'shopify-development',
    name: 'Shopify Launch',
    tier: 'New businesses',
    price: 20000,
    orMore: false,
    billing: 'once-off',
    description: 'Everything a new brand needs to start selling on Shopify.',
    features: [
      'Shopify store setup',
      'Premium theme configuration',
      'Product and collection setup',
      'Payment and shipping configuration',
      'Essential apps',
      'Basic SEO',
      'Launch support',
    ],
  },
  {
    service: 'shopify-development',
    name: 'Shopify Growth',
    tier: 'Growing retailers',
    price: 40000,
    orMore: false,
    billing: 'once-off',
    featured: true,
    description: 'Custom functionality and conversion work for a growing store.',
    includesPrevious: 'Everything in Launch, plus',
    features: [
      'Advanced theme customisation',
      'Custom Liquid sections',
      'Metafields and metaobjects',
      'Custom product templates',
      'Third-party app integrations',
      'Conversion-focused UX improvements',
      'Analytics and tracking setup',
    ],
  },
  {
    service: 'shopify-development',
    name: 'Shopify Custom',
    tier: 'Established brands',
    price: 75000,
    orMore: true,
    billing: 'once-off',
    description: 'A fully custom store for complex catalogues.',
    includesPrevious: 'Everything in Growth, plus',
    features: [
      'Fully custom Shopify theme',
      'Advanced Liquid architecture',
      'Complex product catalogue structures',
      'Custom filtering and search',
      'API integrations',
      'Migration planning where applicable',
    ],
  },
  // Shopify Plus
  {
    service: 'shopify-plus-enterprise',
    name: 'Plus Launch',
    tier: 'Shopify Plus',
    price: 95000,
    orMore: false,
    billing: 'once-off',
    description: 'A Shopify Plus implementation built for scale from day one.',
    features: [
      'Shopify Plus configuration',
      'Custom theme architecture',
      'Advanced storefront development',
      'Multi-market readiness',
      'Checkout configuration within Shopify’s supported capabilities',
      'Analytics, testing and launch',
    ],
  },
  {
    service: 'shopify-plus-enterprise',
    name: 'Plus Growth',
    tier: 'Shopify Plus',
    price: 150000,
    orMore: false,
    billing: 'once-off',
    featured: true,
    description: 'Automation and integrations for complex retail operations.',
    includesPrevious: 'Everything in Plus Launch, plus',
    features: [
      'Shopify Flow automation',
      'Complex catalogue architecture',
      'Custom API integrations',
      'ERP or inventory integration (scoped)',
      'B2B functionality where applicable',
      'Multi-market implementation',
    ],
  },
  {
    service: 'shopify-plus-enterprise',
    name: 'Enterprise Commerce',
    tier: 'Enterprise',
    price: 250000,
    orMore: true,
    billing: 'once-off',
    description: 'Architecture, middleware and rollout support for enterprise commerce.',
    features: [
      'Enterprise discovery and technical architecture',
      'Complex integrations and custom middleware',
      'Multi-store or multi-market architecture',
      'Headless commerce where justified',
      'Data migration',
      'Dedicated technical support during rollout',
    ],
  },
  // Landing pages
  {
    service: 'landing-pages',
    name: 'Essential Landing',
    tier: 'Focused',
    price: 5500,
    orMore: false,
    billing: 'once-off',
    description: 'One conversion-focused page.',
    features: [
      'Single conversion goal',
      'Lead form or WhatsApp CTA',
      'Analytics',
      'SEO foundations',
    ],
  },
  {
    service: 'landing-pages',
    name: 'Business Landing',
    tier: 'Custom',
    price: 8500,
    orMore: false,
    billing: 'once-off',
    featured: true,
    description: 'Custom design and integrations.',
    features: [
      'Custom design',
      'Lead generation forms',
      'WhatsApp and Google Maps',
      'Testimonials section',
      'Campaign tracking',
    ],
  },
  {
    service: 'landing-pages',
    name: 'Campaign Landing',
    tier: 'Advanced',
    price: 12500,
    orMore: true,
    billing: 'once-off',
    description: 'An advanced campaign experience.',
    features: [
      'Custom animations',
      'Multiple integrations',
      'A/B-ready structure',
      'Advanced tracking',
    ],
  },
  // Support
  {
    service: 'support-and-maintenance',
    name: 'Essential Care',
    tier: '2 hours / month',
    price: 1500,
    orMore: false,
    billing: 'monthly',
    description: 'Updates, monitoring and small fixes.',
    features: ['2 development hours', 'Dependency updates', 'Monitoring', 'Bug fixes'],
  },
  {
    service: 'support-and-maintenance',
    name: 'Growth Care',
    tier: '5 hours / month',
    price: 3500,
    orMore: false,
    billing: 'monthly',
    featured: true,
    description: 'Regular improvements and support.',
    features: [
      '5 development hours',
      'Everything in Essential',
      'Performance checks',
      'Content changes',
    ],
  },
  {
    service: 'support-and-maintenance',
    name: 'Priority Care',
    tier: '12 hours / month',
    price: 7500,
    orMore: false,
    billing: 'monthly',
    description: 'Priority response and ongoing development.',
    features: [
      '12 development hours',
      'Priority response times',
      'Feature development',
      'Technical support',
    ],
  },
  {
    service: 'support-and-maintenance',
    name: 'Dedicated Development',
    tier: 'Custom allocation',
    price: null,
    orMore: false,
    billing: 'custom',
    description: 'An agreed monthly allocation of development time.',
    features: ['Agreed monthly hours', 'Roadmap planning', 'Direct developer access'],
  },
]

// Custom web development has no fixed tiers in the plan; it is quoted per project.

export const capabilities = [
  {
    slug: 'frontend-development',
    title: 'Frontend Development',
    summary: 'Accessible, fast interfaces in React and Next.js with strong TypeScript types.',
    items: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Motion'],
  },
  {
    slug: 'backend-cms',
    title: 'Backend & CMS Development',
    summary: 'Structured content and business logic in Payload CMS, PostgreSQL and Node.js.',
    items: ['Payload CMS', 'PostgreSQL', 'Node.js', 'PHP & Laravel'],
  },
  {
    slug: 'shopify-engineering',
    title: 'Shopify Engineering',
    summary: 'Liquid architecture, custom sections, metafields and Shopify APIs.',
    items: ['Liquid', 'Metaobjects', 'Storefront API', 'Admin API', 'Shopify Flow'],
  },
  {
    slug: 'ecommerce-architecture',
    title: 'eCommerce Architecture',
    summary: 'Catalogue structures, multi-market setups and headless commerce where justified.',
    items: ['Catalogue design', 'Multi-market', 'Headless', 'Magento migrations'],
  },
  {
    slug: 'api-integrations',
    title: 'API & Integrations',
    summary: 'REST APIs, webhooks and middleware that connect your platforms.',
    items: ['REST APIs', 'Webhooks', 'ERP', 'Inventory', 'Payments'],
  },
  {
    slug: 'performance-seo',
    title: 'Performance & Technical SEO',
    summary: 'Core Web Vitals, structured data and search-friendly architecture.',
    items: ['Core Web Vitals', 'Structured data', 'Sitemaps', 'Image optimisation'],
  },
  {
    slug: 'hosting-infrastructure',
    title: 'Hosting & Infrastructure',
    summary: 'Deployments on Vercel, AWS or a managed VPS, behind Cloudflare.',
    items: ['Vercel', 'AWS', 'Hetzner', 'Cloudflare', 'GitHub Actions'],
  },
  {
    slug: 'maintenance-support',
    title: 'Maintenance & Support',
    summary: 'Monitoring, updates and ongoing development after launch.',
    items: ['Monitoring', 'Updates', 'Backups', 'Retainers'],
  },
]

export type SeedPartner = {
  name: string
  category:
    | 'commerce'
    | 'cms'
    | 'development'
    | 'payments'
    | 'infrastructure'
    | 'security'
    | 'analytics'
    | 'integrations'
  description: string
  website?: string
}

export const partners: SeedPartner[] = [
  {
    name: 'Shopify',
    category: 'commerce',
    description: 'Hosted commerce for brands of every size.',
    website: 'https://www.shopify.com',
  },
  {
    name: 'Shopify Plus',
    category: 'commerce',
    description: 'Shopify for high-volume and enterprise retail.',
    website: 'https://www.shopify.com/plus',
  },
  {
    name: 'Payload CMS',
    category: 'cms',
    description: 'TypeScript-native headless CMS that runs inside Next.js.',
    website: 'https://payloadcms.com',
  },
  {
    name: 'Next.js',
    category: 'development',
    description: 'The React framework for production websites.',
    website: 'https://nextjs.org',
  },
  {
    name: 'React',
    category: 'development',
    description: 'The library for building user interfaces.',
    website: 'https://react.dev',
  },
  {
    name: 'TypeScript',
    category: 'development',
    description: 'Typed JavaScript for maintainable code.',
    website: 'https://www.typescriptlang.org',
  },
  {
    name: 'PayFast',
    category: 'payments',
    description: 'South African online payments.',
    website: 'https://payfast.io',
  },
  {
    name: 'Peach Payments',
    category: 'payments',
    description: 'Payments across Africa.',
    website: 'https://www.peachpayments.com',
  },
  {
    name: 'Yoco',
    category: 'payments',
    description: 'Card and online payments for South African businesses.',
    website: 'https://www.yoco.com',
  },
  {
    name: 'Vercel',
    category: 'infrastructure',
    description: 'Hosting and edge network for Next.js.',
    website: 'https://vercel.com',
  },
  {
    name: 'AWS',
    category: 'infrastructure',
    description: 'Cloud infrastructure for custom workloads.',
    website: 'https://aws.amazon.com',
  },
  {
    name: 'Hetzner',
    category: 'infrastructure',
    description: 'Cost-effective VPS and dedicated servers.',
    website: 'https://www.hetzner.com',
  },
  {
    name: 'Cloudflare',
    category: 'security',
    description: 'DNS, CDN and security.',
    website: 'https://www.cloudflare.com',
  },
  {
    name: 'Google Analytics',
    category: 'analytics',
    description: 'Traffic and conversion analytics.',
    website: 'https://marketingplatform.google.com/about/analytics/',
  },
  {
    name: 'Google Search Console',
    category: 'analytics',
    description: 'Search visibility and indexing.',
    website: 'https://search.google.com/search-console',
  },
  {
    name: 'REST APIs',
    category: 'integrations',
    description: 'Standard interfaces between your systems.',
  },
  {
    name: 'Webhooks',
    category: 'integrations',
    description: 'Real-time events between platforms.',
  },
]

export const company = {
  intro:
    'AR Tech Dogs is a digital development agency specialising in high-performance websites, scalable eCommerce platforms and custom digital solutions.',
  story:
    'AR Tech Dogs is a senior-led development studio based in South Africa. It was started by a developer with more than ten years of hands-on Shopify, eCommerce and custom web experience, to give businesses direct access to the person doing the work, without agency overhead.\n\n[Founder to add: why the company exists, in their own words.]',
  mission:
    'To help businesses grow through exceptional digital experiences, reliable technology and carefully engineered solutions.',
  vision:
    'To become a trusted development partner for ambitious businesses in South Africa and internationally, known for quality, innovation and long-term partnerships.',
  philosophy:
    'Use modern technology where it adds value, not because it is new. Build things properly, document them, and leave every client with a platform they own and understand.',
  values: [
    { title: 'Quality', description: 'Build things properly, not just quickly.' },
    { title: 'Innovation', description: 'Use modern technology where it adds real value.' },
    { title: 'Transparency', description: 'Clear communication, pricing and expectations.' },
    { title: 'Ownership', description: 'Take responsibility from concept to launch.' },
    { title: 'Partnership', description: 'Build long-term relationships, not just websites.' },
    { title: 'Performance', description: 'Prioritise speed, usability, security and scalability.' },
  ],
  differentiators: [
    { title: 'Direct access', description: 'You work with the developer doing the work.' },
    {
      title: 'Senior Shopify experience',
      description: 'Years of complex retail Shopify and Shopify Plus work.',
    },
    {
      title: 'Modern stack',
      description: 'Next.js and Payload CMS for fast, editable custom sites.',
    },
    {
      title: 'Transparent packages',
      description: 'Published starting prices and clear inclusions.',
    },
    {
      title: 'Flexible retainers',
      description: 'Support plans with included hours and clear response times.',
    },
    {
      title: 'International delivery',
      description: 'Remote-first, working with clients in South Africa and abroad.',
    },
    {
      title: 'Practical solutions',
      description: 'No unnecessary services. Only what moves the business forward.',
    },
  ],
  process: [
    {
      title: 'Discovery & Strategy',
      description: 'Understand your business, goals, audience, budget and technical needs.',
      deliverable: 'Project brief and proposal',
    },
    {
      title: 'Planning & Architecture',
      description: 'Define the sitemap, features, CMS structure, integrations and timeline.',
      deliverable: 'Technical specification and roadmap',
    },
    {
      title: 'Design & Experience',
      description: 'Visual direction, layouts, user journeys, responsive designs and interactions.',
      deliverable: 'Approved design direction',
    },
    {
      title: 'Development & Integration',
      description: 'Frontend, backend, CMS, Shopify functionality and integrations.',
      deliverable: 'Working development environment',
    },
    {
      title: 'Testing & Launch',
      description: 'Mobile, desktop, performance, accessibility, SEO, forms and security.',
      deliverable: 'Approved production website',
    },
    {
      title: 'Support & Growth',
      description: 'Maintenance, technical support, improvements and ongoing development.',
      deliverable: 'Long-term partnership',
    },
  ],
  teamModel: [
    {
      role: 'Founder & Lead Developer',
      description: 'Leads every project, from architecture to launch.',
    },
    { role: 'UI/UX Design', description: 'In-house or trusted freelance design partners.' },
    {
      role: 'Additional Development',
      description: 'Project-based specialists when scope requires it.',
    },
    {
      role: 'SEO & Digital Marketing',
      description: 'Strategic partners for growth beyond development.',
    },
  ],
}

export const founder = {
  name: 'AJ Raubenheimer',
  role: 'Founder & Lead Developer',
  bio: 'Senior web developer with more than ten years of practical experience across Shopify, Shopify Plus, custom Liquid, React, Next.js, Payload CMS, PHP, Laravel and Magento. [Founder to review and expand.]',
  expertise: [
    'Shopify & Shopify Plus',
    'Custom Liquid & theme architecture',
    'Complex catalogue structures',
    'Shopify migrations',
    'React & Next.js',
    'Payload CMS',
    'PHP & Laravel',
    'Magento 1 & 2',
    'MySQL & PostgreSQL',
    'REST APIs',
    'AWS',
    'Performance optimisation',
  ],
  // Founder experience before AR Tech Dogs. Shown with an attribution note. Remove any
  // brand you do not have permission to name.
  experience: [
    'PEP',
    'Ackermans',
    "Levi's SA",
    'Hurley',
    'Reebok',
    'Jeep',
    'Superdry',
    'Diesel',
    'LS2 USA',
  ],
}

/**
 * The rest of the core team, shown after the founder on /meet-the-team.
 * The bios and brands are placeholders written for layout: each person should confirm or
 * replace their own before this is seeded on the live site.
 */
export const team = [
  {
    name: 'Jinx',
    role: 'HR & Client Relations',
    bio: 'Jinx is the border collie in our logo and the first face you meet at AR Tech Dogs. Jinx looks after client relations and the team itself: every enquiry is welcomed, every launch is celebrated, and nobody leaves a call without feeling looked after. [To confirm.]',
    expertise: ['Client care', 'First impressions', 'Team morale', 'Coffee breaks'],
    experience: [] as string[],
  },
  {
    name: 'Ruan Luus',
    role: 'CTO & Senior Developer',
    bio: 'Ruan is a partner in the studio and a senior full-stack developer. He leads backend architecture, integrations and infrastructure, and makes sure what we ship is fast, secure and easy to maintain.',
    expertise: [
      'Node.js & TypeScript',
      'Next.js',
      'Payload CMS',
      'API & ERP integrations',
      'PostgreSQL',
      'AWS & DevOps',
      'Shopify apps',
    ],
    experience: ['Takealot', 'Discovery', 'Vodacom', 'Mr Price'],
  },
  {
    name: 'Zurika Raubenheimer',
    role: 'UI/UX & Designer',
    bio: 'Zurika leads design, from brand direction and user research to the interface details that make a site easy to use. She designs in Figma alongside development, so what you approve is what gets built.',
    expertise: [
      'UI design',
      'UX research & testing',
      'Design systems',
      'Figma prototyping',
      'eCommerce UX',
      'Accessibility',
    ],
    experience: ['Woolworths', 'Truworths', 'Cotton On', 'Sorbet'],
  },
  {
    name: 'Danika Raubenheimer',
    role: 'Head of Marketing',
    bio: 'Danika leads marketing at AR Tech Dogs: positioning, launch campaigns and the SEO and analytics work that keeps a new site growing after it goes live.',
    expertise: [
      'Brand positioning',
      'Campaign strategy',
      'SEO & content',
      'Email & Klaviyo',
      'Paid social',
      'Analytics & reporting',
    ],
    experience: ['Clicks', 'Spur', 'Nando’s', 'Dis-Chem'],
  },
]

/** Jinx, from the brand's team profiles. The team page shows Jinx even before seeding. */
export const jinx = team[0]

/**
 * Sample case studies so the Our Work layout can be checked with content in it. The
 * clients are fictional and every one is created as a draft: preview it in the admin, then
 * replace it with real work or delete it. Never publish these as they are.
 */
export const sampleProjects = [
  {
    title: 'A faster flagship store for a coffee roaster',
    slug: 'sample-coffee-roaster-shopify',
    client: 'Kettle & Crema (sample)',
    industry: 'Food & drink',
    category: 'shopify' as const,
    summary:
      'A new Shopify theme, subscriptions and a wholesale portal for a specialty roaster outgrowing its first store.',
    challenge:
      'The roaster sold beans, gear and subscriptions from a heavily customised free theme. Pages were slow on mobile, subscriptions were managed by hand, and café customers ordered wholesale by email.',
    solution:
      'We built a custom Online Store 2.0 theme with sections the team can rearrange themselves, moved subscriptions onto a native app with a pause and skip flow, and added a wholesale price list behind a customer login.',
    technologies: ['Shopify', 'Liquid', 'Online Store 2.0', 'Recharge', 'Klaviyo'],
    features: [
      'Grind and roast selector on every coffee',
      'Self-serve subscriptions with pause and skip',
      'Wholesale pricing for approved cafés',
      'Brew guides linked to products',
    ],
    results: ['[Sample result: replace with a measured, verifiable figure]'],
    liveUrl: 'https://example.com',
    attribution: 'Sample project for layout preview',
    featured: true,
  },
  {
    title: 'Booking and member portal for a climbing gym',
    slug: 'sample-climbing-gym-platform',
    client: 'Crux Collective (sample)',
    industry: 'Fitness',
    category: 'custom' as const,
    summary:
      'A custom Next.js site with class booking, memberships and waivers, managed from Payload CMS.',
    challenge:
      'Three different tools handled bookings, memberships and waivers, and none of them talked to each other. Staff re-typed details at the front desk every day.',
    solution:
      'One Next.js application now handles timetables, bookings, recurring memberships and digital waivers, with Payload CMS for the team and a Postgres database behind it.',
    technologies: ['Next.js', 'Payload CMS', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
    features: [
      'Live class timetable with capacity limits',
      'Recurring memberships and day passes',
      'Digital waivers signed before arrival',
      'Front-desk check-in view',
    ],
    results: ['[Sample result: replace with a measured, verifiable figure]'],
    liveUrl: 'https://example.com',
    attribution: 'Sample project for layout preview',
    featured: true,
  },
  {
    title: 'Headless storefront for an outdoor gear brand',
    slug: 'sample-outdoor-gear-headless',
    client: 'Ridgeline Outfitters (sample)',
    industry: 'Retail',
    category: 'ecommerce' as const,
    summary:
      'A headless storefront on Shopify Plus with a 6,000-product catalogue, size guides and an ERP stock sync.',
    challenge:
      'A large catalogue with deep variants was hard to browse, and stock levels in the store lagged the warehouse by a day.',
    solution:
      'We built a headless Next.js storefront on the Shopify Storefront API with faceted search, and an integration that syncs stock from the ERP every few minutes.',
    technologies: ['Shopify Plus', 'Hydrogen', 'Next.js', 'Algolia', 'ERP integration'],
    features: [
      'Faceted search across 6,000 products',
      'Size and fit guides per product type',
      'Near-real-time stock from the ERP',
      'Store pickup at four branches',
    ],
    results: ['[Sample result: replace with a measured, verifiable figure]'],
    liveUrl: 'https://example.com',
    attribution: 'Sample project for layout preview',
    featured: false,
  },
  {
    title: 'A clear, quick website for an architecture practice',
    slug: 'sample-architecture-practice-site',
    client: 'Studio Fynbos (sample)',
    industry: 'Architecture',
    category: 'business' as const,
    summary:
      'A portfolio-led business website with a project archive and enquiry form, edited entirely by the practice.',
    challenge:
      'The practice had an outdated site that only the original developer could update, so new projects never made it online.',
    solution:
      'We designed a portfolio-first site with a simple CMS, so the team can publish a project with photographs and a short write-up in minutes.',
    technologies: ['Next.js', 'Payload CMS', 'Vercel', 'Google Analytics'],
    features: [
      'Project archive filtered by sector',
      'Large photography with fast loading',
      'Enquiry form routed to the right partner',
      'Editable team and services pages',
    ],
    results: ['[Sample result: replace with a measured, verifiable figure]'],
    liveUrl: 'https://example.com',
    attribution: 'Sample project for layout preview',
    featured: false,
  },
]

export const siteSettings = {
  siteName: 'AR Tech Dogs',
  tagline: 'Web & Shopify Development, Cape Town',
  defaultDescription:
    'Senior-led web development studio in Cape Town. Custom websites, Shopify and Shopify Plus stores, and platforms built to load fast and grow.',
  contact: {
    email: 'aj@artechdogs.co.za',
    phone: '',
    whatsapp: '',
    location: 'Cape Town, South Africa · Working worldwide',
    bookingUrl: '',
    notificationEmail: 'aj@artechdogs.co.za',
  },
  pricingNote:
    'All prices are in South African rand (ZAR), excluding VAT where applicable, and are starting prices. Hosting, domains, Shopify subscriptions, paid apps and third-party licences are billed separately. Final pricing follows a scoped proposal.',
}

export const homepage = {
  heroEyebrow: 'Senior-led development studio',
  heroHeading: 'Digital experiences. Engineered to grow.',
  heroSubheading:
    'We design and develop high-performance websites, powerful eCommerce platforms and custom digital solutions that help ambitious businesses move forward.',
  primaryCta: { label: 'Start a Project', url: '/contact' },
  secondaryCta: { label: 'Explore Our Work', url: '/our-work' },
  positioning:
    'A senior-led, development-focused digital agency that builds premium websites, sophisticated Shopify stores and custom digital platforms without unnecessary agency overhead.',
  finalCtaHeading: 'Have a project in mind?',
  finalCtaBody:
    'Tell us what you are building. We reply to every enquiry personally, with honest next steps.',
}

export const navigation = [
  { label: 'About', url: '/about' },
  { label: 'Team', url: '/meet-the-team' },
  { label: 'Solutions', url: '/solutions' },
  { label: 'Capabilities', url: '/capabilities' },
  { label: 'Our Work', url: '/our-work' },
  { label: 'Ecosystem', url: '/ecosystem' },
  { label: 'Pricing', url: '/pricing' },
]

export const footerNavigation = [
  { label: 'Contact', url: '/contact' },
  { label: 'Pricing', url: '/pricing' },
  { label: 'Insights', url: '/posts' },
]

export const enquiryOptions = {
  services: [
    'Custom Web Development',
    'Shopify Development',
    'Shopify Plus & Enterprise',
    'Business Website',
    'Landing Page',
    'Support & Maintenance',
    'Something else',
  ],
  budgets: [
    'Under R10,000',
    'R10,000 – R25,000',
    'R25,000 – R50,000',
    'R50,000 – R100,000',
    'R100,000 – R250,000',
    'R250,000+',
    'Not sure yet',
  ],
  timeframes: ['As soon as possible', 'Within 1 month', '1 – 3 months', '3 – 6 months', 'Flexible'],
}
