-- Seed Data for Opportunities
-- These are sample internships and jobs based on your requested skills

-- Data Science Intern
INSERT INTO public.opportunities (
  title, company, type, location, is_remote, description, requirements, salary_range, deadline, is_active
) VALUES (
  'Data Science Intern',
  'MTN Rwanda',
  'internship',
  'Kigali, Rwanda',
  false,
  'Join our data team to work on real-world data science projects. You will analyze large datasets, build predictive models, and create data visualizations to help drive business decisions.',
  'Python programming, Data analysis, Statistics, Machine Learning basics, SQL',
  '$500 - $800/month',
  '2026-06-30',
  true
);

-- Junior Software Developer
INSERT INTO public.opportunities (
  title, company, type, location, is_remote, description, requirements, salary_range, deadline, is_active
) VALUES (
  'Junior Software Developer',
  'Andela',
  'job',
  'Nairobi, Kenya',
  true,
  'We are looking for passionate junior developers to join our engineering team. You will work on full-stack web applications using modern technologies and agile methodologies.',
  'JavaScript, Python or Java, Git, Problem-solving, Communication skills',
  '$1,200 - $2,000/month',
  '2026-05-15',
  true
);

-- UX Designer
INSERT INTO public.opportunities (
  title, company, type, location, is_remote, description, requirements, salary_range, deadline, is_active
) VALUES (
  'UX Designer',
  'Safaricom',
  'job',
  'Nairobi, Kenya',
  false,
  'Design intuitive and beautiful user experiences for our mobile and web applications. Collaborate with product managers and developers to create user-centered designs.',
  'UI/UX Design, Figma or Sketch, User Research, Prototyping, Design Systems',
  '$1,500 - $2,500/month',
  '2026-04-30',
  true
);

-- Frontend Developer Intern
INSERT INTO public.opportunities (
  title, company, type, location, is_remote, description, requirements, salary_range, deadline, is_active
) VALUES (
  'Frontend Developer Intern',
  'Flutterwave',
  'internship',
  'Lagos, Nigeria',
  true,
  'Learn and grow as a frontend developer while building payment solutions used by millions of Africans. Work with React, TypeScript, and modern web technologies.',
  'JavaScript, React or Vue.js, HTML/CSS, Git basics',
  '$600 - $900/month',
  '2026-05-31',
  true
);

-- Product Design Intern
INSERT INTO public.opportunities (
  title, company, type, location, is_remote, description, requirements, salary_range, deadline, is_active
) VALUES (
  'Product Design Intern',
  'Paystack',
  'internship',
  'Lagos, Nigeria',
  true,
  'Join our design team and help shape the future of payments in Africa. You will work on user research, wireframing, prototyping, and visual design.',
  'UI/UX fundamentals, Figma, Creativity, Attention to detail',
  '$500 - $700/month',
  '2026-06-15',
  true
);

-- Tech Startup Entrepreneur Program
INSERT INTO public.opportunities (
  title, company, type, location, is_remote, description, requirements, salary_range, deadline, is_active
) VALUES (
  'Tech Startup Accelerator Program',
  'African Leadership University',
  'entrepreneurship',
  'Kigali, Rwanda',
  false,
  'A 3-month intensive program for aspiring tech entrepreneurs. Get mentorship, funding opportunities, and resources to launch your startup.',
  'Business idea, Entrepreneurial mindset, Commitment to building in Africa',
  'Up to $25,000 in funding',
  '2026-07-01',
  true
);

-- Data Analyst
INSERT INTO public.opportunities (
  title, company, type, location, is_remote, description, requirements, salary_range, deadline, is_active
) VALUES (
  'Data Analyst',
  'Bank of Kigali',
  'job',
  'Kigali, Rwanda',
  false,
  'Analyze financial data and provide insights to support business decisions. Work with our analytics team to build dashboards and reports.',
  'Python, SQL, Data Visualization, Excel, Statistics',
  '$1,000 - $1,800/month',
  '2026-05-20',
  true
);

-- Full Stack Developer
INSERT INTO public.opportunities (
  title, company, type, location, is_remote, description, requirements, salary_range, deadline, is_active
) VALUES (
  'Full Stack Developer',
  'Jumia',
  'job',
  'Cairo, Egypt',
  true,
  'Build and maintain e-commerce applications serving millions of customers across Africa. Work with a diverse team of engineers on challenging problems.',
  'JavaScript, Node.js or Python, React, PostgreSQL, REST APIs',
  '$1,500 - $3,000/month',
  '2026-06-01',
  true
);
