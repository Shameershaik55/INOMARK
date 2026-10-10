import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface DeliverableItem {
  id: string;
  title: string;
  qty: number;
  aspect: string;
  duration: string;
  description: string;
  icon: string;
  colorClass: string;
}

export default function CreateBriefPage() {
  const navigate = useNavigate();

  // Section 01: Overview
  const [campaignTitle, setCampaignTitle] = useState(
    'Nordic Botanical Serum — Cinematic Specular Launch Video & Packshots'
  );
  const [brandCompany, setBrandCompany] = useState('Aura Botanica');
  const [industry, setIndustry] = useState('Beauty & Luxury Wellness');
  const [objective, setObjective] = useState<'Brand Awareness' | 'Product Launch' | 'Social Engagement' | 'Product Visuals'>('Product Launch');
  const [description, setDescription] = useState(
    'Introducing our flagship cold-pressed Nordic Botanical Serum. We require a visually stunning launch piece emphasizing pure glacial hydration, botanical extracts (cloudberry, lingonberry, and birch sap), and ultra-refined skincare science. The aesthetic must highlight extreme macro moisture droplets suspended on translucent glass, caustics through amber botanical oil, and an ethereal sub-zero morning light atmosphere. Creators are encouraged to push realism using advanced LoRAs and physics-guided diffusion.'
  );
  const [targetAudience, setTargetAudience] = useState(
    'Gen-Z & Millennial skincare enthusiasts (ages 22-38) valuing sustainable minimalism, clinical transparency, and photoreal aesthetics.'
  );

  // Section 02: Deliverables
  const [contentTypes, setContentTypes] = useState<string[]>([
    'AI Video Advertisement',
    'AI Filmmaking / Cinematic',
    'Product Photography Visuals'
  ]);
  const [projectScope, setProjectScope] = useState(
    'Deliver 1 x 30s hero vertical 9:16 video reel, 1 x 15s teaser 16:9 landscape cut, and 3 x high-res 4:5 macro product packshot stills.'
  );
  const [deliverables, setDeliverables] = useState<DeliverableItem[]>([
    {
      id: 'd1',
      title: 'Hero Cinematic Commercial',
      qty: 1,
      aspect: '9:16 Vertical',
      duration: '30s Duration',
      description: 'Must feature seamless macro liquid simulations and botanical flora bloom. Formats: MP4 (ProRes/H.265).',
      icon: 'smart_display',
      colorClass: 'bg-primary/10 text-primary'
    },
    {
      id: 'd2',
      title: 'Widescreen Teaser Cut',
      qty: 1,
      aspect: '16:9 4K UHD',
      duration: '15s Loop',
      description: 'Optimized for YouTube pre-roll and website desktop hero banner loop. Fast pacing, ambient audio bed.',
      icon: 'movie_edit',
      colorClass: 'bg-secondary/10 text-secondary'
    },
    {
      id: 'd3',
      title: 'Macro Dewdrop Packshots',
      qty: 3,
      aspect: '4:5 (2160x2700)',
      duration: 'PNG 16-Bit',
      description: 'Focus on glass bottle dropper, translucent golden serum viscosity, and clean alpha mask cutouts.',
      icon: 'photo_library',
      colorClass: 'bg-tertiary/10 text-tertiary'
    }
  ]);
  const [moodboardLinks, setMoodboardLinks] = useState<string[]>([
    'aurabotanica.com/moodboard-autumn',
    'vimeo.com/792841/spec-lighting'
  ]);
  const [newLinkInput, setNewLinkInput] = useState('');
  const [showAddDeliverableModal, setShowAddDeliverableModal] = useState(false);
  const [newDelivTitle, setNewDelivTitle] = useState('');
  const [newDelivQty, setNewDelivQty] = useState(1);
  const [newDelivAspect, setNewDelivAspect] = useState('9:16 Vertical');
  const [newDelivDuration, setNewDelivDuration] = useState('15s');
  const [newDelivDesc, setNewDelivDesc] = useState('');

  // Section 03: Creative Vision
  const [visualStyles, setVisualStyles] = useState<string[]>([
    'Photorealistic',
    'Cinematic',
    'Minimalist',
    'Premium or Luxury'
  ]);
  const [creativeDirection, setCreativeDirection] = useState(
    'Nordic naturalism meets high-gloss clinical elegance. Diffused morning sunlight, frosty glass surfaces, slow-motion botanical blooming, and tactile water droplet caustics. Serene, pristine, and ultra-high fidelity with soft natural periwinkle and champagne tones.'
  );
  const [keyMessage, setKeyMessage] = useState('Purity formulated by nature, precision amplified by intelligence.');
  const [callToAction, setCallToAction] = useState('"Discover More"');
  const [mustInclude, setMustInclude] = useState(
    'Actual frosted bottle silhouette, dropper pipetting serum drop, cruelty-free certification icon watermark in corner.'
  );
  const [mustAvoid, setMustAvoid] = useState(
    'Cartoony 3D characters, hyper-saturated neon lighting, artificial plastic skin glazes, flashing strobe video cuts.'
  );

  // Section 04: Tech Specs
  const [platforms, setPlatforms] = useState<string[]>([
    'Instagram Reels',
    'TikTok',
    'Website / Hero Page',
    'YouTube Shorts / 4K'
  ]);
  const [aiTools, setAiTools] = useState(
    'Midjourney v6.1 / Flux.1 Dev for stills, Runway Gen-3 Alpha / Kling 1.5 for motion video (Creator can propose alternatives)'
  );
  const [fileHandover, setFileHandover] = useState(
    'Final exports + ComfyUI workflow JSON or LoRA configuration metadata'
  );

  // Section 05: Schedule & Delivery
  const [startDate, setStartDate] = useState('Nov 01, 2026');
  const [deadline, setDeadline] = useState('Nov 28, 2026');
  const [pacing, setPacing] = useState('Standard (4 Weeks)');

  // Section 06: Budget & Compensation
  const [budgetType, setBudgetType] = useState<'Fixed Budget' | 'Budget Range' | 'Open to Proposals' | 'To Be Discussed'>('Budget Range');
  const [currency, setCurrency] = useState('USD ($)');
  const [budgetMin, setBudgetMin] = useState('$3,500');
  const [budgetMax, setBudgetMax] = useState('$5,000');
  const [compensationNotes, setCompensationNotes] = useState(
    'Budget covers total production, two rounds of revisions per deliverable, and full sound mixing rights.'
  );

  // Section 07: Usage & Licensing
  const [intendedUsage, setIntendedUsage] = useState('Commercial advertising or paid promotion + Organic social media');
  const [usageDuration, setUsageDuration] = useState('Ongoing or perpetual use');
  const [geographicScope, setGeographicScope] = useState('Worldwide');
  const [exclusivity, setExclusivity] = useState('Exclusive commercial use in beauty/skincare category');
  const [aiProvenance, setAiProvenance] = useState('Creator agrees to disclose base models used for client assurance.');

  // Section 08: Additional
  const [creatorSkills, setCreatorSkills] = useState<string[]>([
    'ComfyUI Workflow Mastery',
    'Fluid / Liquid Simulation',
    'Cinematic Color Grading',
    'Photoreal LoRA Training'
  ]);
  const [scriptLanguage, setScriptLanguage] = useState('English (Neutral or European voiceover tone)');

  // Section 09: Review & Verification Checklist
  const [checklist, setChecklist] = useState({
    objective: true,
    deliverables: true,
    direction: true,
    deadline: true,
    budget: true,
    usage: true
  });

  // AI 1-Line Brief Architect States
  const [aiPromptInput, setAiPromptInput] = useState('');
  const [isAiAnalyzing, setIsAiAnalyzing] = useState(false);
  const [aiAnalysisStep, setAiAnalysisStep] = useState('');
  const [lastGeneratedConcept, setLastGeneratedConcept] = useState<string | null>(null);

  const AI_SUGGESTIONS = [
    {
      icon: 'spa',
      label: 'Botanical Skincare',
      prompt: 'Nordic Botanical Serum — Glacial hydration and dewdrop macro launch'
    },
    {
      icon: 'diamond',
      label: 'Luxury Perfume',
      prompt: 'Luxury floral perfume launch with glowing glass caustics and amber viscosity'
    },
    {
      icon: 'directions_run',
      label: 'Cyberpunk Sneaker',
      prompt: 'Zero-gravity kinetic running sneaker commercial in rainy Tokyo night'
    },
    {
      icon: 'coffee',
      label: 'Nitro Cold Brew',
      prompt: 'Artisanal nitro cold brew with slow-motion fluid splashes and roasted beans'
    },
    {
      icon: 'electric_bolt',
      label: 'Hyper-EV Monolith',
      prompt: 'Autonomous electric hypercar reveal with aerodynamic sunset salt flats commercial'
    }
  ];

  const generateAndApplyBrief = (rawQuery: string) => {
    const q = rawQuery.toLowerCase();

    if (q.includes('perfume') || q.includes('fragrance') || q.includes('scent') || q.includes('flacon')) {
      setCampaignTitle('Maison Éthérée — Luminous Amber Flacon & Kinetic Glass Caustic Commercial');
      setBrandCompany('Maison Éthérée Haute Parfumerie');
      setIndustry('Haute Parfumerie & Luxury Goods');
      setObjective('Product Launch');
      setDescription(
        'Introducing our flagship nocturnal eau de parfum. We require an ethereal, sensorial campaign capturing heavy crystalline flacon glass refracting golden amber notes, liquid caustics, and blooming night jasmine petal micro-dynamics. The piece must convey opulence, tactile warmth, and poetic mystery using physics-guided diffusion and custom caustics.'
      );
      setTargetAudience(
        'Affluent fragrance collectors & luxury design patrons (ages 25-45) valuing artisanal craftsmanship and cinematic aesthetics.'
      );
      setContentTypes(['AI Video Advertisement', 'AI Filmmaking / Cinematic', 'Product Photography Visuals']);
      setProjectScope(
        'Deliver 1 x 30s 9:16 vertical commercial, 1 x 15s 16:9 4K cut, and 3 x high-res 4:5 print-ready macro packshots.'
      );
      setDeliverables([
        {
          id: 'd-perfume-1',
          title: 'Hero Caustic Commercial',
          qty: 1,
          aspect: '9:16 Vertical',
          duration: '30s Duration',
          description: 'Liquid amber refraction through heavy sculpted glass with blooming night florals and ambient strings.',
          icon: 'smart_display',
          colorClass: 'bg-primary/10 text-primary'
        },
        {
          id: 'd-perfume-2',
          title: '4K Widescreen Master',
          qty: 1,
          aspect: '16:9 4K UHD',
          duration: '15s Loop',
          description: 'Hero website header and YouTube campaign pre-roll with ambient orchestral sound design.',
          icon: 'movie_edit',
          colorClass: 'bg-secondary/10 text-secondary'
        },
        {
          id: 'd-perfume-3',
          title: 'Macro Flacon Stills',
          qty: 3,
          aspect: '4:5 (2160x2700)',
          duration: 'PNG 16-Bit',
          description: 'Specular highlights on bottle shoulders, gold atomiser nozzle, and dewdrop caustics.',
          icon: 'photo_library',
          colorClass: 'bg-tertiary/10 text-tertiary'
        }
      ]);
      setVisualStyles(['Photorealistic', 'Cinematic', 'Minimalist', 'Premium or Luxury']);
      setCreativeDirection(
        'Golden hour chiaroscuro lighting, deep umber shadows, prismatic caustics through heavy lead-free crystal, floating amber fluid droplets, 85mm anamorphic portrait depth.'
      );
      setKeyMessage('An invisible signature of timeless allure.');
      setCallToAction('"Inquire & Reserve"');
      setMustInclude('Sculpted bottle silhouette, embossed gold cap monogram, warm amber liquid viscosity.');
      setMustAvoid('Over-saturated neon colors, generic stock perfume tropes, plastic textures, artificial skin smoothing.');
      setPlatforms(['Instagram Reels', 'TikTok', 'Website / Hero Page', 'YouTube Shorts / 4K']);
      setAiTools('Midjourney v6.1 / FLUX.1 Dev for macro glass caustics, Kling 1.5 / Runway Gen-3 Alpha for fluid motion.');
      setBudgetMin('$4,500');
      setBudgetMax('$7,000');
      setCompensationNotes('Full commercial buyout for global digital channels. Includes two revision rounds and raw lossless project stems.');
      setCreatorSkills(['Macro Glass Caustics Simulation', 'ComfyUI Raytracing', 'Anamorphic Color Grading', 'Photoreal Diffusion']);
    } else if (q.includes('sneaker') || q.includes('shoe') || q.includes('runner') || q.includes('cyberpunk') || q.includes('footwear')) {
      setCampaignTitle('Apex Cyber-Runner — Zero-Gravity Kinetic Sneaker Launch Commercial');
      setBrandCompany('Apex Kinetic Lab');
      setIndustry('Virtual Fashion & Athletic Footwear');
      setObjective('Product Launch');
      setDescription(
        'Launching our futuristic zero-gravity running sneaker engineered with generative metamaterial cushioning. We require a high-octane visual campaign featuring an athlete sprinting across rain-slicked Tokyo neon streets, mid-air gravity suspension, dynamic particle dissipation, and ultra-macro knit mesh texture reveals.'
      );
      setTargetAudience(
        'Gen-Z and young millennial runners, streetwear collectors, and techwear enthusiasts (ages 18-34).'
      );
      setContentTypes(['AI Video Advertisement', 'Short-form Social Reels (9:16)', '3D Product Rendering']);
      setProjectScope(
        '1 x 30s 9:16 high-energy reel with phonk/synthwave beat, 1 x 1:1 360-degree sneaker turntable loop, and 4 x editorial stills.'
      );
      setDeliverables([
        {
          id: 'd-sneaker-1',
          title: 'Kinetic Neon Social Reel',
          qty: 1,
          aspect: '9:16 Vertical',
          duration: '30s Duration',
          description: 'High-speed tracking camera, rain droplets splashing on sole cushioning, neon reflection trails.',
          icon: 'smart_display',
          colorClass: 'bg-primary/10 text-primary'
        },
        {
          id: 'd-sneaker-2',
          title: '360° Metamaterial Turntable',
          qty: 1,
          aspect: '1:1 Square (4K)',
          duration: '10s Seamless Loop',
          description: 'Exploded view of carbon fiber plate, pneumatic air pods, and generative knit upper.',
          icon: '3d_rotation',
          colorClass: 'bg-secondary/10 text-secondary'
        },
        {
          id: 'd-sneaker-3',
          title: 'Editorial Lookbook Stills',
          qty: 4,
          aspect: '4:5 (2160x2700)',
          duration: 'TIFF / PNG',
          description: 'High-contrast cyberpunk fashion street photography showing on-foot silhouette.',
          icon: 'photo_library',
          colorClass: 'bg-tertiary/10 text-tertiary'
        }
      ]);
      setVisualStyles(['Photorealistic', 'Cinematic', 'Futuristic or Sci-Fi', 'High-Contrast']);
      setCreativeDirection(
        'Dark moody cyberpunk palette, electric cyan and magenta laser reflections in asphalt puddles, motion blur streaks, fast rhythmic editing synchronized to sub-bass hits.'
      );
      setKeyMessage('Defy gravity. Run beyond the grid.');
      setCallToAction('"Pre-Order Drop 01"');
      setMustInclude('Carbon fiber propulsion plate reveal, glowing sole air pockets, water-repellent mesh texture.');
      setMustAvoid('Rigid mannequin poses, cartoonish models, low frame-rate video jitter, muddy motion artifacts.');
      setPlatforms(['TikTok', 'Instagram Reels', 'Website / Hero Page']);
      setAiTools('Runway Gen-3 Alpha / Kling 1.5 Pro for high-speed tracking, CLO3D + FLUX.1 Dev for hyper-detailed textile mesh.');
      setBudgetMin('$4,000');
      setBudgetMax('$6,500');
      setCompensationNotes('Covers paid social licensing for 6 months across Instagram, TikTok, and YouTube.');
      setCreatorSkills(['High-Speed Motion Tracking', 'Generative Knit Texturing', 'Sound Design Sync', 'Photoreal Physics']);
    } else if (q.includes('coffee') || q.includes('drink') || q.includes('beverage') || q.includes('brew') || q.includes('tea')) {
      setCampaignTitle('Solstice Nitro Cold Brew — Sensorial Liquid Splash & Roasted Bean Macro');
      setBrandCompany('Solstice Brew Co.');
      setIndustry('Artisanal Food & Beverage');
      setObjective('Product Visuals');
      setDescription(
        'Introducing our nitrogen-infused single-origin cold brew. We require an irresistible ASMR visual campaign focusing on micro-nitrogen foam cascades, slow-motion amber coffee collisions with crystalline ice cubes, and rich volcanic roasted bean shattering in 1000fps macro.'
      );
      setTargetAudience(
        'Coffee aficionados, urban professionals, and culinary aesthetic seekers (ages 24-42).'
      );
      setContentTypes(['AI Video Advertisement', 'Short-form Social Reels (9:16)', 'Product Photography Visuals']);
      setProjectScope(
        '1 x 15s high-impact social reel, 1 x 16:9 website hero loop, and 3 x condensation macro packshots.'
      );
      setDeliverables([
        {
          id: 'd-coffee-1',
          title: 'Cascading Nitro ASMR Reel',
          qty: 1,
          aspect: '9:16 Vertical',
          duration: '15s Duration',
          description: 'Ultra-slow motion nitrogen foam cascade falling in glass tumbler, frosted condensation beads.',
          icon: 'smart_display',
          colorClass: 'bg-primary/10 text-primary'
        },
        {
          id: 'd-coffee-2',
          title: 'Widescreen Pour Loop',
          qty: 1,
          aspect: '16:9 4K UHD',
          duration: '10s Seamless Loop',
          description: 'Desktop hero banner of rich crema settling into dark cold brew liquor.',
          icon: 'movie_edit',
          colorClass: 'bg-secondary/10 text-secondary'
        },
        {
          id: 'd-coffee-3',
          title: 'Frost & Ice Packshots',
          qty: 3,
          aspect: '4:5 (2160x2700)',
          duration: 'PNG 16-Bit',
          description: 'Glass bottle with realistic condensation beads, cold drip droplets, and roasted beans.',
          icon: 'photo_library',
          colorClass: 'bg-tertiary/10 text-tertiary'
        }
      ]);
      setVisualStyles(['Photorealistic', 'Cinematic', 'Minimalist', 'Editorial Stills']);
      setCreativeDirection(
        'Warm espresso and caramel tones with crisp frosted backlighting. Emphasize micro-textures of nitrogen bubbles, glistening ice facets, and tactile wooden counter surfaces.'
      );
      setKeyMessage('Pure origin. Mastered in cold silence.');
      setCallToAction('"Find Your Roast"');
      setMustInclude('Nitrogen cascade effect, chilled glass bottle condensation, authentic coffee bean textures.');
      setMustAvoid('Artificial plastic fluid look, cloudy or murky liquid textures, oversaturated colors.');
      setPlatforms(['Instagram Reels', 'TikTok', 'Website / Hero Page']);
      setAiTools('Kling 1.5 Pro / Runway Gen-3 for liquid physics simulation, FLUX.1 Dev for hyper-real macro ice caustics.');
      setBudgetMin('$3,200');
      setBudgetMax('$5,200');
      setCompensationNotes('Standard commercial digital usage worldwide with full sound effects handover.');
      setCreatorSkills(['Fluid Dynamic Simulation', 'Macro Droplet Physics', 'ASMR Audio Pairing', 'Photoreal Caustics']);
    } else if (q.includes('car') || q.includes('auto') || q.includes('ev') || q.includes('hypercar') || q.includes('vehicle')) {
      setCampaignTitle('Volt Aetheris Hyper-EV — Aerodynamic Desert Speed Vortex Reveal');
      setBrandCompany('Volt Motorworks');
      setIndustry('Automotive & High-Tech Mobility');
      setObjective('Brand Awareness');
      setDescription(
        'Unveiling our flagship electric hypercar with bio-adaptive active aerodynamics. We require an epic cinematic commercial set on salt flats at twilight. The vehicle cuts through atmospheric mist, forming vortex condensation trails off its active wing, with headlights slicing through dusk haze in Arri Alexa cinematic quality.'
      );
      setTargetAudience(
        'Automotive enthusiasts, EV early-adopters, and luxury tech tastemakers (ages 28-55).'
      );
      setContentTypes(['AI Filmmaking / Cinematic', 'AI Video Advertisement', '3D Product Rendering']);
      setProjectScope(
        '1 x 45s 16:9 4K master commercial, 1 x 9:16 vertical cutdown, and 4 x high-res exterior hero stills.'
      );
      setDeliverables([
        {
          id: 'd-car-1',
          title: 'Cinematic Master Commercial',
          qty: 1,
          aspect: '16:9 4K UHD',
          duration: '45s Duration',
          description: 'Dynamic FPV tracking shots, high-speed desert salt flats drift, active aero wing articulation.',
          icon: 'movie_edit',
          colorClass: 'bg-primary/10 text-primary'
        },
        {
          id: 'd-car-2',
          title: 'Vertical Social Cutdown',
          qty: 1,
          aspect: '9:16 Vertical',
          duration: '20s Duration',
          description: 'Fast-paced social edit focusing on aggressive LED light signatures and wheel aerodynamics.',
          icon: 'smart_display',
          colorClass: 'bg-secondary/10 text-secondary'
        },
        {
          id: 'd-car-3',
          title: 'Hero Dusk Stills',
          qty: 4,
          aspect: '16:9 (3840x2160)',
          duration: 'EXR / TIFF',
          description: 'Reflective salt flat puddles mirroring aerodynamic bodywork under violet twilight sky.',
          icon: 'photo_library',
          colorClass: 'bg-tertiary/10 text-tertiary'
        }
      ]);
      setVisualStyles(['Photorealistic', 'Cinematic', 'Futuristic or Sci-Fi', 'Premium or Luxury']);
      setCreativeDirection(
        'Deep obsidian paint with violet dusk horizon lighting, volumetric dust trails, anamorphic horizontal flares, and low-angle camera movement inspired by high-budget car commercials.'
      );
      setKeyMessage('Where raw power meets computational silence.');
      setCallToAction('"Configure Your Allocation"');
      setMustInclude('Accurate aerodynamic vortex trails, distinctive continuous LED headlight bar, realistic tire smoke.');
      setMustAvoid('Warped car proportions, fake video-game geometry, floating tires, inconsistent body lines.');
      setPlatforms(['YouTube Shorts / 4K', 'Website / Hero Page', 'Instagram Reels']);
      setAiTools('Unreal Engine 5.4 + Sora AI / Runway Gen-3 Alpha, custom ComfyUI automotive checkpoint.');
      setBudgetMin('$6,500');
      setBudgetMax('$11,000');
      setCompensationNotes('Full global commercial license including broadcast and high-res print rights.');
      setCreatorSkills(['Automotive Rigging & Lighting', 'Unreal Engine Integration', 'Photoreal Environmental VFX']);
    } else if (q.includes('botanical') || q.includes('skin') || q.includes('serum') || q.includes('beauty')) {
      setCampaignTitle('Nordic Botanical Serum — Cinematic Specular Launch Video & Packshots');
      setBrandCompany('Aura Botanica');
      setIndustry('Beauty & Luxury Wellness');
      setObjective('Product Launch');
      setDescription(
        'Introducing our flagship cold-pressed Nordic Botanical Serum. We require a visually stunning launch piece emphasizing pure glacial hydration, botanical extracts (cloudberry, lingonberry, and birch sap), and ultra-refined skincare science. The aesthetic must highlight extreme macro moisture droplets suspended on translucent glass, caustics through amber botanical oil, and an ethereal sub-zero morning light atmosphere.'
      );
      setTargetAudience(
        'Gen-Z & Millennial skincare enthusiasts (ages 22-38) valuing sustainable minimalism, clinical transparency, and photoreal aesthetics.'
      );
      setContentTypes(['AI Video Advertisement', 'AI Filmmaking / Cinematic', 'Product Photography Visuals']);
      setProjectScope(
        'Deliver 1 x 30s hero vertical 9:16 video reel, 1 x 15s teaser 16:9 landscape cut, and 3 x high-res 4:5 macro product packshot stills.'
      );
      setDeliverables([
        {
          id: 'd1',
          title: 'Hero Cinematic Commercial',
          qty: 1,
          aspect: '9:16 Vertical',
          duration: '30s Duration',
          description: 'Must feature seamless macro liquid simulations and botanical flora bloom. Formats: MP4 (ProRes/H.265).',
          icon: 'smart_display',
          colorClass: 'bg-primary/10 text-primary'
        },
        {
          id: 'd2',
          title: 'Widescreen Teaser Cut',
          qty: 1,
          aspect: '16:9 4K UHD',
          duration: '15s Loop',
          description: 'Optimized for YouTube pre-roll and website desktop hero banner loop. Fast pacing, ambient audio bed.',
          icon: 'movie_edit',
          colorClass: 'bg-secondary/10 text-secondary'
        },
        {
          id: 'd3',
          title: 'Macro Dewdrop Packshots',
          qty: 3,
          aspect: '4:5 (2160x2700)',
          duration: 'PNG 16-Bit',
          description: 'Focus on glass bottle dropper, translucent golden serum viscosity, and clean alpha mask cutouts.',
          icon: 'photo_library',
          colorClass: 'bg-tertiary/10 text-tertiary'
        }
      ]);
      setVisualStyles(['Photorealistic', 'Cinematic', 'Minimalist', 'Premium or Luxury']);
      setCreativeDirection(
        'Nordic naturalism meets high-gloss clinical elegance. Diffused morning sunlight, frosty glass surfaces, slow-motion botanical blooming, and tactile water droplet caustics. Serene, pristine, and ultra-high fidelity with soft natural periwinkle and champagne tones.'
      );
      setKeyMessage('Purity formulated by nature, precision amplified by intelligence.');
      setCallToAction('"Discover More"');
      setMustInclude('Actual frosted bottle silhouette, dropper pipetting serum drop, cruelty-free certification icon watermark in corner.');
      setMustAvoid('Cartoony 3D characters, hyper-saturated neon lighting, artificial plastic skin glazes, flashing strobe video cuts.');
      setPlatforms(['Instagram Reels', 'TikTok', 'Website / Hero Page', 'YouTube Shorts / 4K']);
      setAiTools('Midjourney v6.1 / Flux.1 Dev for stills, Runway Gen-3 Alpha / Kling 1.5 for motion video (Creator can propose alternatives)');
      setBudgetMin('$3,500');
      setBudgetMax('$5,000');
      setCompensationNotes('Budget covers total production, two rounds of revisions per deliverable, and full sound mixing rights.');
      setCreatorSkills(['ComfyUI Workflow Mastery', 'Fluid / Liquid Simulation', 'Cinematic Color Grading', 'Photoreal LoRA Training']);
    } else {
      // General Smart NLP Generation for ANY arbitrary line prompt
      const words = rawQuery.split(' ').filter(w => w.length > 2);
      const titleWords = words.map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).slice(0, 5).join(' ');
      const cleanTitle = titleWords.length > 3 ? `${titleWords} — Commercial Campaign & Visual Launch` : `${rawQuery} — AI Commercial Launch`;

      setCampaignTitle(cleanTitle);
      setBrandCompany('Enterprise Brand Partner');
      setIndustry('Commercial Creative & Innovation');
      setObjective('Product Launch');
      setDescription(
        `Commercial brief synthesized for: "${rawQuery}". We require a visually breathtaking, high-fidelity generative production that brings this concept to life with photorealistic detail, emotive storytelling, and cutting-edge generative cinematography. Creators should emphasize physical lighting coherence, tactile textures, and dynamic camera choreography.`
      );
      setTargetAudience(
        'Discerning modern consumers and digital design enthusiasts valuing authentic craft, cinematic production value, and innovative aesthetics.'
      );
      setContentTypes(['AI Video Advertisement', 'AI Filmmaking / Cinematic', 'Product Photography Visuals']);
      setProjectScope(
        'Deliver 1 x 30s hero 9:16 vertical commercial, 1 x 15s 16:9 4K cutdown, and 3 x ultra-high resolution keyframe packshots.'
      );
      setDeliverables([
        {
          id: 'd-gen-1',
          title: 'Hero 9:16 Social Commercial',
          qty: 1,
          aspect: '9:16 Vertical',
          duration: '30s Duration',
          description: `Full sensory cinematic video showcasing "${rawQuery}" with synchronized sound design and seamless camera motion.`,
          icon: 'smart_display',
          colorClass: 'bg-primary/10 text-primary'
        },
        {
          id: 'd-gen-2',
          title: '16:9 Landscape 4K Master',
          qty: 1,
          aspect: '16:9 4K UHD',
          duration: '15s Loop',
          description: 'High-impact widescreen cut optimized for web hero header, digital billboard, and YouTube.',
          icon: 'movie_edit',
          colorClass: 'bg-secondary/10 text-secondary'
        },
        {
          id: 'd-gen-3',
          title: 'Master Keyframe Packshots',
          qty: 3,
          aspect: '4:5 (2160x2700)',
          duration: 'PNG 16-Bit',
          description: 'Pristine high-resolution stills with lossless color fidelity and clean alpha cutouts.',
          icon: 'photo_library',
          colorClass: 'bg-tertiary/10 text-tertiary'
        }
      ]);
      setVisualStyles(['Photorealistic', 'Cinematic', 'Minimalist', 'Premium or Luxury']);
      setCreativeDirection(
        `Dynamic cinematic lighting with rich contrast and textural depth tailored to "${rawQuery}". High production value, seamless camera movement, and pristine physical materials.`
      );
      setKeyMessage(`Experience the future of ${rawQuery.split(' ')[0] || 'creation'}.`);
      setCallToAction('"Explore The Launch"');
      setMustInclude('Sharp material details, photorealistic lighting physics, high temporal consistency in video.');
      setMustAvoid('Flickering artifacts, warped geometry, generic AI stock tropes, muddy motion blur.');
      setPlatforms(['Instagram Reels', 'TikTok', 'Website / Hero Page', 'YouTube Shorts / 4K']);
      setAiTools('Runway Gen-3 Alpha / Kling 1.5 Pro for motion, FLUX.1 Dev / Midjourney v6.1 for master stills.');
      setBudgetMin('$3,800');
      setBudgetMax('$6,200');
      setCompensationNotes('Covers all digital channels globally. Includes two revision rounds and final high-bitrate masters.');
      setCreatorSkills(['Photoreal Diffusion Mastery', 'Temporal Video Consistency', 'Color Grading', 'Sound Design']);
    }
  };

  const handleAiGenerate = (textToUse?: string) => {
    const query = (textToUse || aiPromptInput).trim();
    if (!query) return;

    setIsAiAnalyzing(true);
    setAiAnalysisStep('Analyzing campaign sentiment & creative domain...');

    setTimeout(() => {
      setAiAnalysisStep('Deriving multi-aspect deliverables, motion timelines & packshots...');
    }, 400);

    setTimeout(() => {
      setAiAnalysisStep('Synthesizing photoreal creative direction, model stack & escrow budget...');
    }, 800);

    setTimeout(() => {
      generateAndApplyBrief(query);
      setIsAiAnalyzing(false);
      setLastGeneratedConcept(query);
    }, 1200);
  };

  // State modals
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Handlers
  const toggleContentType = (item: string) => {
    setContentTypes(prev =>
      prev.includes(item) ? prev.filter(c => c !== item) : [...prev, item]
    );
  };

  const toggleVisualStyle = (style: string) => {
    setVisualStyles(prev =>
      prev.includes(style) ? prev.filter(s => s !== style) : [...prev, style]
    );
  };

  const togglePlatform = (p: string) => {
    setPlatforms(prev =>
      prev.includes(p) ? prev.filter(item => item !== p) : [...prev, p]
    );
  };

  const handleAddLink = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newLinkInput.trim()) {
      e.preventDefault();
      setMoodboardLinks([...moodboardLinks, newLinkInput.trim()]);
      setNewLinkInput('');
    }
  };

  const removeLink = (index: number) => {
    setMoodboardLinks(moodboardLinks.filter((_, i) => i !== index));
  };

  const handleAddDeliverable = () => {
    if (newDelivTitle.trim()) {
      const newItem: DeliverableItem = {
        id: 'd-' + Date.now(),
        title: newDelivTitle.trim(),
        qty: newDelivQty,
        aspect: newDelivAspect,
        duration: newDelivDuration,
        description: newDelivDesc.trim() || 'Standard deliverable specification.',
        icon: 'smart_display',
        colorClass: 'bg-primary/10 text-primary'
      };
      setDeliverables([...deliverables, newItem]);
      setNewDelivTitle('');
      setNewDelivDesc('');
      setShowAddDeliverableModal(false);
    }
  };

  const removeDeliverable = (id: string) => {
    setDeliverables(deliverables.filter(d => d.id !== id));
  };

  const handlePublish = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setPublishSuccess(true);
      setTimeout(() => {
        navigate('/brand/briefs');
      }, 1500);
    }, 1000);
  };

  return (
    <div className="relative w-full min-h-screen bg-background font-body text-body-md text-on-surface antialiased pb-24">
      {/* Subtle Ambient Glow Orbs */}
      <div className="relative w-full pointer-events-none">
        <div className="absolute -top-16 left-1/4 w-96 h-96 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-48 right-12 w-80 h-80 bg-secondary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10" />
      </div>

      {/* Main Container */}
      <div className="w-full px-6 lg:px-12 flex flex-col gap-6 pt-4">
        {/* Breadcrumbs & Top Action Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2 pb-4 border-b border-surface-container/60">
          <div className="flex items-center gap-2 font-label-caption text-label-caption text-on-surface-variant">
            <Link to="/brand/dashboard" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>Home</span>
            </Link>
            <span className="text-outline-variant">/</span>
            <Link to="/brand/briefs" className="hover:text-primary transition-colors">
              My Briefs
            </Link>
            <span className="text-outline-variant">/</span>
            <span className="text-primary font-semibold">Create a Brief</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/brand/briefs"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-label-button text-label-button text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              <span>Back to My Briefs</span>
            </Link>
            <button
              onClick={() => alert('Draft saved successfully to Brand Atelier.')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-label-button text-label-button bg-surface-container-lowest text-on-surface shadow-xs hover:bg-surface-container-low transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant">bookmark_border</span>
              <span>Save Draft</span>
            </button>
            <button
              onClick={() => setIsPreviewModalOpen(true)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-label-button text-label-button bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-fixed-dim transition-all shadow-xs"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              <span>Preview Brief</span>
            </button>
            <button
              onClick={handlePublish}
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-label-button text-label-button bg-primary text-on-primary hover:bg-primary-container shadow-[0_8px_24px_-4px_rgba(70,72,212,0.35)] hover:shadow-lg transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
              <span>{isSubmitting ? 'Publishing...' : 'Publish Brief'}</span>
            </button>
          </div>
        </div>

        {/* Hero Header Section */}
        <div className="flex flex-col gap-3 py-2 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed/50 w-fit">
            <span className="material-symbols-outlined text-secondary text-[16px]">stars</span>
            <span className="font-label-badge text-label-badge text-secondary uppercase tracking-wider font-bold">
              AI Creator Marketplace
            </span>
          </div>
          <h1 className="font-headline-lg text-3xl sm:text-4xl lg:text-5xl text-on-surface tracking-tight font-serif">
            Create a Campaign Brief
          </h1>
          <p className="font-body-lg text-base sm:text-lg text-on-surface-variant max-w-3xl leading-relaxed">
            Give creators a clear understanding of your project, creative vision, deliverables, and expectations. A detailed brief helps the right creators evaluate your requirements before deciding whether the opportunity is right for them.
          </p>
        </div>

        {/* Progress Navigation Pill Bar */}
        <div className="sticky top-16 z-30 py-3 -mx-4 px-4 bg-surface/90 backdrop-blur-xl border-y border-surface-container/60 transition-all">
          <div className="overflow-x-auto pb-1 scrollbar-none flex items-center gap-2">
            {[
              { id: 'section-overview', num: '1', title: 'Overview' },
              { id: 'section-deliverables', num: '2', title: 'Deliverables' },
              { id: 'section-vision', num: '3', title: 'Creative Vision' },
              { id: 'section-specs', num: '4', title: 'Tech Specs' },
              { id: 'section-timeline', num: '5', title: 'Timeline' },
              { id: 'section-budget', num: '6', title: 'Budget' },
              { id: 'section-licensing', num: '7', title: 'Licensing' },
              { id: 'section-additional', num: '8', title: 'Additional' },
              { id: 'section-review', num: '9', title: 'Review & Publish' }
            ].map(sec => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full font-label-button text-xs font-semibold bg-surface-container-low text-on-surface hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors shadow-xs"
              >
                <span className="w-5 h-5 rounded-full bg-surface-container-high flex items-center justify-center text-xs font-semibold">
                  {sec.num}
                </span>
                <span>{sec.title}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Two-Column Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-2">
          {/* LEFT COLUMN: Main Form Steps (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* AI 1-LINE BRIEF ARCHITECT CARD */}
            <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-secondary/15 via-primary/5 to-surface-container-lowest border-2 border-secondary/30 shadow-lg relative overflow-hidden flex flex-col gap-6">
              {/* Decorative sparkle corner background */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-secondary/20 rounded-full blur-2xl pointer-events-none" />

              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-secondary to-primary flex items-center justify-center text-white shadow-md shrink-0">
                    <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="font-headline text-lg sm:text-xl font-bold text-on-surface">
                        AI 1-Line Brief Architect
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full bg-secondary/15 text-secondary text-[11px] font-label font-bold uppercase tracking-wider">
                        Smart Auto-Fill
                      </span>
                    </div>
                    <p className="font-body text-xs text-on-surface-variant mt-0.5">
                      Enter a single line describing your product or campaign concept. InoMark AI will analyze the domain and generate the complete 6-module production brief with deliverables and specs.
                    </p>
                  </div>
                </div>
              </div>

              {/* Input Bar Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAiGenerate();
                }}
                className="flex flex-col sm:flex-row items-center gap-3 relative z-10"
              >
                <div className="relative flex-1 w-full">
                  <span className="material-symbols-outlined text-[20px] text-secondary absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    magic_button
                  </span>
                  <input
                    type="text"
                    placeholder="e.g. Luxury floral perfume launch with glowing glass caustics and amber viscosity..."
                    value={aiPromptInput}
                    onChange={(e) => setAiPromptInput(e.target.value)}
                    disabled={isAiAnalyzing}
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-surface-container-lowest border-2 border-outline-variant/30 text-xs sm:text-sm font-body text-on-surface placeholder:text-outline focus:outline-none focus:border-secondary shadow-xs transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isAiAnalyzing || !aiPromptInput.trim()}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-secondary to-primary hover:opacity-95 disabled:opacity-50 text-white font-label text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isAiAnalyzing ? 'progress_activity' : 'auto_awesome'}
                  </span>
                  <span>{isAiAnalyzing ? 'Analyzing...' : 'Analyze & Generate Brief ✦'}</span>
                </button>
              </form>

              {/* Clickable Sample Suggestions */}
              <div className="space-y-2 relative z-10">
                <span className="text-[11px] font-label font-semibold text-outline uppercase tracking-wider block">
                  Quick Test Prompts (1-Click Fill):
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {AI_SUGGESTIONS.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setAiPromptInput(item.prompt);
                        handleAiGenerate(item.prompt);
                      }}
                      disabled={isAiAnalyzing}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-lowest hover:bg-surface-container-high border border-outline-variant/30 text-on-surface text-xs font-label font-medium transition-colors cursor-pointer shadow-2xs"
                    >
                      <span className="material-symbols-outlined text-[15px] text-secondary">{item.icon}</span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Loading Steps Card */}
              {isAiAnalyzing && (
                <div className="p-4 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-md border border-secondary/30 flex items-center gap-3 animate-pulse shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary animate-spin shrink-0">
                    <span className="material-symbols-outlined text-[20px]">sync</span>
                  </div>
                  <div>
                    <p className="text-xs font-label font-bold text-secondary">
                      InoMark AI Architect Working...
                    </p>
                    <p className="text-[11px] font-body text-on-surface-variant">
                      {aiAnalysisStep}
                    </p>
                  </div>
                </div>
              )}

              {/* Success Generated Banner */}
              {lastGeneratedConcept && !isAiAnalyzing && (
                <div className="p-4 rounded-2xl bg-secondary-fixed/40 border border-secondary/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary text-white flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px]">check</span>
                    </div>
                    <div>
                      <p className="text-xs font-label font-bold text-on-surface">
                        Campaign Brief Formulated for: "{lastGeneratedConcept}"
                      </p>
                      <p className="text-[11px] font-body text-on-surface-variant">
                        All 9 sections (Overview, 3 Custom Deliverables, Creative Vision, Tech Specs, Schedule & Escrow Budget) have been populated. Review and customize below.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <a
                      href="#section-overview"
                      className="px-3.5 py-1.5 rounded-full bg-secondary text-white text-xs font-label font-semibold shadow-xs hover:bg-secondary/90 transition-colors"
                    >
                      Review Below
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setLastGeneratedConcept(null);
                        setAiPromptInput('');
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-label font-medium transition-colors cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                </div>
              )}
            </section>

            {/* SECTION 01: CAMPAIGN OVERVIEW */}
            <section
              id="section-overview"
              className="p-6 sm:p-8 rounded-2xl bg-surface-container-lowest shadow-[0_4px_24px_-2px_rgba(99,102,241,0.05)] border border-surface-container/60 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-surface-container/60">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-semibold text-sm">
                    01
                  </span>
                  <div>
                    <h2 className="font-headline-sm text-lg sm:text-xl text-on-surface font-semibold">Campaign Overview</h2>
                    <p className="font-label-caption text-xs text-on-surface-variant">Core identity, context, and key campaign milestones.</p>
                  </div>
                </div>
                <span className="font-label-badge text-xs px-3 py-1 rounded-full bg-surface-container-low text-primary uppercase font-bold tracking-wider">
                  Required Step
                </span>
              </div>

              {/* Campaign Title */}
              <div className="flex flex-col gap-2">
                <label className="font-label-button text-xs font-semibold text-on-surface flex items-center gap-1.5">
                  Campaign Title <span className="text-error">*</span>
                </label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 outline-none transition-all shadow-inner"
                  type="text"
                  value={campaignTitle}
                  onChange={(e) => setCampaignTitle(e.target.value)}
                  placeholder="E.g., Autumn Capsule AI Fashion Lookbook"
                />
                <p className="font-label-caption text-xs text-on-surface-variant">
                  Give your brief a descriptive title that highlights the hero product and creative format.
                </p>
              </div>

              {/* Brand & Industry */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-label-button text-xs font-semibold text-on-surface flex items-center gap-1.5">
                    Brand or Company <span className="text-error">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <input
                      className="w-full pl-4 pr-10 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      type="text"
                      value={brandCompany}
                      onChange={(e) => setBrandCompany(e.target.value)}
                    />
                    <span className="material-symbols-outlined absolute right-3.5 text-primary text-[20px]" title="Verified Brand">
                      verified
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-button text-xs font-semibold text-on-surface">Industry / Category</label>
                  <input
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  />
                </div>
              </div>

              {/* Campaign Objective */}
              <div className="flex flex-col gap-2.5">
                <label className="font-label-button text-xs font-semibold text-on-surface flex items-center gap-1.5">
                  Campaign Objective <span className="text-error">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'Brand Awareness', icon: 'campaign', label: 'Brand Awareness' },
                    { id: 'Product Launch', icon: 'rocket_launch', label: 'Product Launch' },
                    { id: 'Social Engagement', icon: 'trending_up', label: 'Social Engagement' },
                    { id: 'Product Visuals', icon: 'view_in_ar', label: 'Product Visuals' }
                  ].map(item => {
                    const isSelected = objective === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setObjective(item.id as any)}
                        className={`p-3 rounded-xl text-left transition-all flex flex-col gap-1.5 ${
                          isSelected
                            ? 'bg-primary text-on-primary ring-2 ring-primary/40 shadow-sm'
                            : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                        }`}
                      >
                        <span className={`material-symbols-outlined text-[20px] ${isSelected ? 'text-on-primary' : 'text-on-surface-variant'}`}>
                          {item.icon}
                        </span>
                        <span className={`font-label-caption text-xs font-semibold ${isSelected ? 'text-on-primary' : 'text-on-surface'}`}>
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Campaign Description */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="font-label-button text-xs font-semibold text-on-surface flex items-center gap-1.5">
                    Campaign Description <span className="text-error">*</span>
                  </label>
                  <span className="font-label-caption text-xs text-on-surface-variant">
                    {description.length} / 2,000 characters
                  </span>
                </div>
                <textarea
                  className="w-full p-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 outline-none transition-all leading-relaxed"
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the background, core storytelling angle, and overarching ambition..."
                />
              </div>

              {/* Target Audience */}
              <div className="flex flex-col gap-2">
                <label className="font-label-button text-xs font-semibold text-on-surface">Target Audience (Recommended)</label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                />
              </div>
            </section>

            {/* SECTION 02: CONTENT & DELIVERABLES */}
            <section
              id="section-deliverables"
              className="p-6 sm:p-8 rounded-2xl bg-surface-container-lowest shadow-[0_4px_24px_-2px_rgba(99,102,241,0.05)] border border-surface-container/60 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-surface-container/60">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-semibold text-sm">
                    02
                  </span>
                  <div>
                    <h2 className="font-headline-sm text-lg sm:text-xl text-on-surface font-semibold">Content & Deliverables</h2>
                    <p className="font-label-caption text-xs text-on-surface-variant">Specify formats, quantities, reference links, and production assets.</p>
                  </div>
                </div>
                <span className="font-label-badge text-xs px-3 py-1 rounded-full bg-surface-container-low text-primary uppercase font-bold tracking-wider">
                  Required Step
                </span>
              </div>

              {/* Content Type Multi-Select Cards */}
              <div className="flex flex-col gap-2.5">
                <label className="font-label-button text-xs font-semibold text-on-surface flex items-center gap-1.5">
                  Content Type <span className="text-error">*</span>
                </label>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { id: 'AI Video Advertisement', icon: 'videocam' },
                    { id: 'AI Filmmaking / Cinematic', icon: 'movie' },
                    { id: 'Product Photography Visuals', icon: 'photo_camera' },
                    { id: '3D Product Motion', icon: 'view_in_ar' },
                    { id: 'Concept Art / Key Visuals', icon: 'palette' }
                  ].map(t => {
                    const isSelected = contentTypes.includes(t.id);
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => toggleContentType(t.id)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-label-button text-xs font-semibold cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-primary-fixed text-on-primary-fixed ring-2 ring-primary/20'
                            : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">{t.icon}</span>
                        <span>{t.id}</span>
                        {isSelected && <span className="material-symbols-outlined text-[16px]">check</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Project Scope */}
              <div className="flex flex-col gap-2">
                <label className="font-label-button text-xs font-semibold text-on-surface flex items-center gap-1.5">
                  Project Scope <span className="text-error">*</span>
                </label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  type="text"
                  value={projectScope}
                  onChange={(e) => setProjectScope(e.target.value)}
                />
              </div>

              {/* Deliverables Repeatable List */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <label className="font-label-button text-xs font-semibold text-on-surface flex items-center gap-1.5">
                    Deliverables List ({deliverables.length} Added) <span className="text-error">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowAddDeliverableModal(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container text-primary font-label-button text-xs font-semibold hover:bg-primary hover:text-on-primary transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">add_circle</span>
                    <span>Add Deliverable</span>
                  </button>
                </div>

                {deliverables.map(deliv => (
                  <div
                    key={deliv.id}
                    className="p-4 rounded-xl bg-surface-container-low flex flex-col sm:flex-row items-start justify-between gap-4 border border-surface-container/60"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`w-10 h-10 rounded-xl ${deliv.colorClass} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <span className="material-symbols-outlined text-[22px]">{deliv.icon}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-headline-sm text-sm text-on-surface font-semibold">{deliv.title}</h4>
                          <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-semibold">
                            Qty: {deliv.qty}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-xs">
                            {deliv.aspect}
                          </span>
                          <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-xs">
                            {deliv.duration}
                          </span>
                        </div>
                        <p className="font-body-sm text-xs text-on-surface-variant">{deliv.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                      <button
                        type="button"
                        onClick={() => removeDeliverable(deliv.id)}
                        className="p-2 rounded-full hover:bg-error-container text-error transition-colors"
                        title="Remove"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reference Materials & Links */}
              <div className="flex flex-col gap-2">
                <label className="font-label-button text-xs font-semibold text-on-surface">Reference Materials & Moodboard Links</label>
                <div className="flex flex-wrap items-center gap-2 p-2.5 rounded-xl bg-surface-container-low min-h-[52px]">
                  {moodboardLinks.map((link, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface text-xs shadow-xs"
                    >
                      <span className="material-symbols-outlined text-primary text-[16px]">link</span>
                      <span>{link}</span>
                      <span
                        onClick={() => removeLink(idx)}
                        className="material-symbols-outlined text-on-surface-variant text-[14px] cursor-pointer hover:text-error"
                      >
                        close
                      </span>
                    </span>
                  ))}
                  <input
                    className="bg-transparent outline-none px-2 py-1 flex-1 text-xs text-on-surface placeholder:text-on-surface-variant"
                    placeholder="Add URL and press Enter..."
                    type="text"
                    value={newLinkInput}
                    onChange={(e) => setNewLinkInput(e.target.value)}
                    onKeyDown={handleAddLink}
                  />
                </div>
              </div>

              {/* Brand Assets Drop Zone */}
              <div className="flex flex-col gap-2">
                <label className="font-label-button text-xs font-semibold text-on-surface">Brand Assets & Guidelines</label>
                <div className="p-6 rounded-2xl bg-surface-container-low flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:bg-surface-container transition-colors border border-dashed border-outline/30">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-[24px]">cloud_upload</span>
                  </div>
                  <div className="font-label-button text-xs font-semibold text-on-surface">Click to upload brand logos, 3D assets, or drag & drop files</div>
                  <div className="font-label-caption text-xs text-on-surface-variant">PNG, JPG, PDF, ZIP, OBJ up to 100MB</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="material-symbols-outlined text-primary text-[20px]">picture_as_pdf</span>
                      <span className="font-body-sm text-xs text-on-surface truncate">Aura_Botanica_Brand_Guidelines_v3.pdf</span>
                    </div>
                    <span className="font-label-caption text-xs text-on-surface-variant">4.2 MB</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="material-symbols-outlined text-primary text-[20px]">image</span>
                      <span className="font-body-sm text-xs text-on-surface truncate">Bottle_CAD_Orthographics.png</span>
                    </div>
                    <span className="font-label-caption text-xs text-on-surface-variant">8.1 MB</span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 03: CREATIVE VISION & STYLE */}
            <section
              id="section-vision"
              className="p-6 sm:p-8 rounded-2xl bg-surface-container-lowest shadow-[0_4px_24px_-2px_rgba(99,102,241,0.05)] border border-surface-container/60 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-surface-container/60">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-semibold text-sm">
                    03
                  </span>
                  <div>
                    <h2 className="font-headline-sm text-lg sm:text-xl text-on-surface font-semibold">Creative Vision & Style</h2>
                    <p className="font-label-caption text-xs text-on-surface-variant">Guide aesthetic treatment, color balance, visual dos and don'ts.</p>
                  </div>
                </div>
                <span className="font-label-badge text-xs px-3 py-1 rounded-full bg-surface-container-low text-primary uppercase font-bold tracking-wider">
                  Required Step
                </span>
              </div>

              {/* Preferred Visual Style */}
              <div className="flex flex-col gap-2.5">
                <label className="font-label-button text-xs font-semibold text-on-surface">Preferred Visual Style</label>
                <div className="flex flex-wrap gap-2">
                  {['Photorealistic', 'Cinematic', 'Minimalist', 'Premium or Luxury', 'Surrealist', 'Documentary'].map(style => {
                    const isSelected = visualStyles.includes(style);
                    return (
                      <button
                        key={style}
                        type="button"
                        onClick={() => toggleVisualStyle(style)}
                        className={`px-4 py-1.5 rounded-full font-label-button text-xs font-semibold cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-primary-fixed text-on-primary-fixed'
                            : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                        }`}
                      >
                        {style} {isSelected ? '✓' : ''}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Creative Direction Textarea */}
              <div className="flex flex-col gap-2">
                <label className="font-label-button text-xs font-semibold text-on-surface flex items-center gap-1.5">
                  Creative Direction <span className="text-error">*</span>
                </label>
                <textarea
                  className="w-full p-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 outline-none transition-all leading-relaxed"
                  rows={4}
                  value={creativeDirection}
                  onChange={(e) => setCreativeDirection(e.target.value)}
                />
              </div>

              {/* Key Message & CTA */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-label-button text-xs font-semibold text-on-surface">Key Message (Recommended)</label>
                  <input
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    type="text"
                    value={keyMessage}
                    onChange={(e) => setKeyMessage(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-button text-xs font-semibold text-on-surface">Call to Action (CTA)</label>
                  <input
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    type="text"
                    value={callToAction}
                    onChange={(e) => setCallToAction(e.target.value)}
                  />
                </div>
              </div>

              {/* Must Include / Must Avoid Split Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2 p-4 rounded-xl bg-surface-container-low border border-surface-container/60">
                  <div className="flex items-center gap-2 text-on-surface font-label-button text-xs font-semibold">
                    <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                    <span>Must Include</span>
                  </div>
                  <textarea
                    className="w-full p-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-xs outline-none focus:ring-1 focus:ring-primary/20"
                    rows={3}
                    value={mustInclude}
                    onChange={(e) => setMustInclude(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2 p-4 rounded-xl bg-surface-container-low border border-surface-container/60">
                  <div className="flex items-center gap-2 text-error font-label-button text-xs font-semibold">
                    <span className="material-symbols-outlined text-[20px]">cancel</span>
                    <span>Must Avoid</span>
                  </div>
                  <textarea
                    className="w-full p-3 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-xs outline-none focus:ring-1 focus:ring-error/20"
                    rows={3}
                    value={mustAvoid}
                    onChange={(e) => setMustAvoid(e.target.value)}
                  />
                </div>
              </div>
            </section>

            {/* SECTION 04: TECH SPECS */}
            <section
              id="section-specs"
              className="p-6 sm:p-8 rounded-2xl bg-surface-container-lowest shadow-[0_4px_24px_-2px_rgba(99,102,241,0.05)] border border-surface-container/60 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-surface-container/60">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-semibold text-sm">
                    04
                  </span>
                  <div>
                    <h2 className="font-headline-sm text-lg sm:text-xl text-on-surface font-semibold">Format & Technical Requirements</h2>
                    <p className="font-label-caption text-xs text-on-surface-variant">Publishing destinations, resolutions, AI models, and handover files.</p>
                  </div>
                </div>
              </div>

              {/* Primary Publishing Platforms */}
              <div className="flex flex-col gap-2.5">
                <label className="font-label-button text-xs font-semibold text-on-surface">Target Platforms</label>
                <div className="flex flex-wrap gap-2">
                  {['Instagram Reels', 'TikTok', 'Website / Hero Page', 'YouTube Shorts / 4K', 'Pinterest'].map(p => {
                    const isSelected = platforms.includes(p);
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => togglePlatform(p)}
                        className={`px-4 py-1.5 rounded-full font-label-button text-xs font-semibold cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-primary text-on-primary'
                            : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Technical Specification Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-3 border border-surface-container/60">
                  <div className="flex items-center gap-2 font-label-button text-xs font-semibold text-on-surface">
                    <span className="material-symbols-outlined text-primary text-[20px]">videocam</span>
                    <span>Motion & Video Specifications</span>
                  </div>
                  <div className="flex flex-col gap-2 text-xs text-on-surface-variant">
                    <div className="flex justify-between py-1 bg-surface-container-lowest px-3 rounded-lg">
                      <span className="font-semibold text-on-surface">Frame Rate:</span>
                      <span>24 fps Cinematic</span>
                    </div>
                    <div className="flex justify-between py-1 bg-surface-container-lowest px-3 rounded-lg">
                      <span className="font-semibold text-on-surface">Resolution:</span>
                      <span>4K UHD (3840x2160) & 9:16</span>
                    </div>
                    <div className="flex justify-between py-1 bg-surface-container-lowest px-3 rounded-lg">
                      <span className="font-semibold text-on-surface">Audio:</span>
                      <span>Spatial Sound Design included</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-3 border border-surface-container/60">
                  <div className="flex items-center gap-2 font-label-button text-xs font-semibold text-on-surface">
                    <span className="material-symbols-outlined text-secondary text-[20px]">image</span>
                    <span>Stills & Imagery Specifications</span>
                  </div>
                  <div className="flex flex-col gap-2 text-xs text-on-surface-variant">
                    <div className="flex justify-between py-1 bg-surface-container-lowest px-3 rounded-lg">
                      <span className="font-semibold text-on-surface">Dimensions:</span>
                      <span>2160 x 2700 (4:5 Aspect)</span>
                    </div>
                    <div className="flex justify-between py-1 bg-surface-container-lowest px-3 rounded-lg">
                      <span className="font-semibold text-on-surface">Color Depth:</span>
                      <span>16-bit Lossless PNG</span>
                    </div>
                    <div className="flex justify-between py-1 bg-surface-container-lowest px-3 rounded-lg">
                      <span className="font-semibold text-on-surface">Masks:</span>
                      <span>Transparent Alpha Packshots</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Tool & Model Preferences */}
              <div className="flex flex-col gap-2">
                <label className="font-label-button text-xs font-semibold text-on-surface">AI Tool / Model Preferences</label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  type="text"
                  value={aiTools}
                  onChange={(e) => setAiTools(e.target.value)}
                />
              </div>

              {/* File Handover */}
              <div className="flex flex-col gap-2">
                <label className="font-label-button text-xs font-semibold text-on-surface">Deliverable File Handover</label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  type="text"
                  value={fileHandover}
                  onChange={(e) => setFileHandover(e.target.value)}
                />
              </div>
            </section>

            {/* SECTION 05: TIMELINE & MILESTONES */}
            <section
              id="section-timeline"
              className="p-6 sm:p-8 rounded-2xl bg-surface-container-lowest shadow-[0_4px_24px_-2px_rgba(99,102,241,0.05)] border border-surface-container/60 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-surface-container/60">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-semibold text-sm">
                    05
                  </span>
                  <div>
                    <h2 className="font-headline-sm text-lg sm:text-xl text-on-surface font-semibold">Schedule & Delivery</h2>
                    <p className="font-label-caption text-xs text-on-surface-variant">Dates, staging intervals, and revision milestones.</p>
                  </div>
                </div>
                <span className="font-label-badge text-xs px-3 py-1 rounded-full bg-surface-container-low text-primary uppercase font-bold tracking-wider">
                  Required Step
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-label-button text-xs font-semibold text-on-surface">Project Start Date</label>
                  <div className="flex items-center px-4 py-3 rounded-xl bg-surface-container-low text-on-surface">
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px] mr-2">calendar_today</span>
                    <input
                      type="text"
                      className="bg-transparent outline-none text-xs w-full font-semibold"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-button text-xs font-semibold text-on-surface flex items-center gap-1.5">
                    Final Deadline <span className="text-error">*</span>
                  </label>
                  <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-surface-container-low text-on-surface">
                    <div className="flex items-center flex-1">
                      <span className="material-symbols-outlined text-on-surface-variant text-[18px] mr-2">event_available</span>
                      <input
                        type="text"
                        className="bg-transparent outline-none text-xs w-full font-bold text-primary"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                      />
                    </div>
                    <span className="material-symbols-outlined text-primary text-[18px]">check_circle</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-button text-xs font-semibold text-on-surface">Pacing Category</label>
                  <div className="flex items-center px-4 py-3 rounded-xl bg-surface-container-low text-on-surface">
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px] mr-2">speed</span>
                    <input
                      type="text"
                      className="bg-transparent outline-none text-xs w-full"
                      value={pacing}
                      onChange={(e) => setPacing(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Milestones Step-by-Step Flow */}
              <div className="flex flex-col gap-3">
                <span className="font-label-button text-xs font-semibold text-on-surface">Production Milestones</span>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-low border border-surface-container/60">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-semibold">
                        1
                      </span>
                      <div>
                        <div className="font-label-button text-xs font-semibold text-on-surface">Moodboard & Initial Concept Stills</div>
                        <div className="font-label-caption text-xs text-on-surface-variant">Due Date: Nov 06, 2026 · Review round 1</div>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-surface-container-lowest text-primary font-label-caption text-xs font-semibold shadow-xs">
                      Milestone 1 (25%)
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-low border border-surface-container/60">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-semibold">
                        2
                      </span>
                      <div>
                        <div className="font-label-button text-xs font-semibold text-on-surface">Rough Cut Motion Pass & First Render Draft</div>
                        <div className="font-label-caption text-xs text-on-surface-variant">Due Date: Nov 16, 2026 · Pacing & sound preview</div>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-surface-container-lowest text-primary font-label-caption text-xs font-semibold shadow-xs">
                      Milestone 2 (50%)
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-low border border-surface-container/60">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs font-semibold">
                        3
                      </span>
                      <div>
                        <div className="font-label-button text-xs font-semibold text-on-surface">Final Grade, Sound Polish & Master Handover</div>
                        <div className="font-label-caption text-xs text-on-surface-variant">Due Date: Nov 28, 2026 · Complete delivery release</div>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-surface-container-lowest text-primary font-label-caption text-xs font-semibold shadow-xs">
                      Milestone 3 (25%)
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 06: BUDGET & COMPENSATION */}
            <section
              id="section-budget"
              className="p-6 sm:p-8 rounded-2xl bg-surface-container-lowest shadow-[0_4px_24px_-2px_rgba(99,102,241,0.05)] border border-surface-container/60 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-surface-container/60">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-semibold text-sm">
                    06
                  </span>
                  <div>
                    <h2 className="font-headline-sm text-lg sm:text-xl text-on-surface font-semibold">Budget & Compensation</h2>
                    <p className="font-label-caption text-xs text-on-surface-variant">Clear monetary terms attract qualified, top-tier creators.</p>
                  </div>
                </div>
                <span className="font-label-badge text-xs px-3 py-1 rounded-full bg-surface-container-low text-primary uppercase font-bold tracking-wider">
                  Required Step
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {['Fixed Budget', 'Budget Range', 'Open to Proposals', 'To Be Discussed'].map(bt => {
                  const isSelected = budgetType === bt;
                  return (
                    <button
                      key={bt}
                      type="button"
                      onClick={() => setBudgetType(bt as any)}
                      className={`p-3 rounded-xl text-left transition-colors font-semibold text-xs ${
                        isSelected
                          ? 'bg-primary text-on-primary ring-2 ring-primary/40 shadow-sm'
                          : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                      }`}
                    >
                      {bt} {isSelected ? '✓' : ''}
                    </button>
                  );
                })}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-label-button text-xs font-semibold text-on-surface">Currency</label>
                  <input
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-sm outline-none"
                    type="text"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-button text-xs font-semibold text-on-surface flex items-center gap-1.5">
                    Minimum Budget <span className="text-error">*</span>
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-sm font-semibold focus:ring-2 focus:ring-primary/20 outline-none"
                    type="text"
                    value={budgetMin}
                    onChange={(e) => setBudgetMin(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-button text-xs font-semibold text-on-surface flex items-center gap-1.5">
                    Maximum Budget <span className="text-error">*</span>
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-sm font-semibold focus:ring-2 focus:ring-primary/20 outline-none"
                    type="text"
                    value={budgetMax}
                    onChange={(e) => setBudgetMax(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-button text-xs font-semibold text-on-surface">Compensation Notes</label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-sm focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  type="text"
                  value={compensationNotes}
                  onChange={(e) => setCompensationNotes(e.target.value)}
                />
              </div>
            </section>

            {/* SECTION 07: USAGE & LICENSING */}
            <section
              id="section-licensing"
              className="p-6 sm:p-8 rounded-2xl bg-surface-container-lowest shadow-[0_4px_24px_-2px_rgba(99,102,241,0.05)] border border-surface-container/60 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-surface-container/60">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-semibold text-sm">
                    07
                  </span>
                  <div>
                    <h2 className="font-headline-sm text-lg sm:text-xl text-on-surface font-semibold">Usage Rights & Licensing</h2>
                    <p className="font-label-caption text-xs text-on-surface-variant">Clarify distribution territory, duration, and legal scope.</p>
                  </div>
                </div>
                <span className="font-label-badge text-xs px-3 py-1 rounded-full bg-surface-container-low text-primary uppercase font-bold tracking-wider">
                  Required Step
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-label-button text-xs font-semibold text-on-surface flex items-center gap-1.5">
                    Intended Usage <span className="text-error">*</span>
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-sm outline-none"
                    type="text"
                    value={intendedUsage}
                    onChange={(e) => setIntendedUsage(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-button text-xs font-semibold text-on-surface">Usage Duration</label>
                  <input
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-sm outline-none"
                    type="text"
                    value={usageDuration}
                    onChange={(e) => setUsageDuration(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-button text-xs font-semibold text-on-surface">Geographic Scope</label>
                  <input
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-sm outline-none"
                    type="text"
                    value={geographicScope}
                    onChange={(e) => setGeographicScope(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-label-button text-xs font-semibold text-on-surface">Exclusivity</label>
                  <input
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-sm outline-none"
                    type="text"
                    value={exclusivity}
                    onChange={(e) => setExclusivity(e.target.value)}
                  />
                </div>
              </div>

              {/* Notice Banner */}
              <div className="p-4 rounded-xl bg-tertiary-fixed/30 text-on-tertiary-fixed flex items-start gap-3 border border-tertiary/20">
                <span className="material-symbols-outlined text-tertiary text-[22px] flex-shrink-0 mt-0.5">info</span>
                <div className="flex flex-col gap-1 text-xs">
                  <span className="font-semibold text-on-tertiary-fixed">Important Notice on Intellectual Property:</span>
                  <p className="leading-relaxed">
                    Usage rights and licensing expectations should be agreed clearly between the brand and creator before work begins. Publishing a brief does not by itself transfer ownership or grant additional rights.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-button text-xs font-semibold text-on-surface">AI Provenance & Disclosures</label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-sm outline-none"
                  type="text"
                  value={aiProvenance}
                  onChange={(e) => setAiProvenance(e.target.value)}
                />
              </div>
            </section>

            {/* SECTION 08: ADDITIONAL INSTRUCTIONS */}
            <section
              id="section-additional"
              className="p-6 sm:p-8 rounded-2xl bg-surface-container-lowest shadow-[0_4px_24px_-2px_rgba(99,102,241,0.05)] border border-surface-container/60 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-surface-container/60">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-semibold text-sm">
                    08
                  </span>
                  <div>
                    <h2 className="font-headline-sm text-lg sm:text-xl text-on-surface font-semibold">Additional Instructions</h2>
                    <p className="font-label-caption text-xs text-on-surface-variant">Creator skill tags, workflow expectations, and linguistic preferences.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2.5">
                <label className="font-label-button text-xs font-semibold text-on-surface">Preferred Creator Skills</label>
                <div className="flex flex-wrap gap-2">
                  {creatorSkills.map((sk, i) => (
                    <span key={i} className="px-4 py-1.5 rounded-full bg-surface-container-high text-on-surface font-label-button text-xs">
                      {sk}
                    </span>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      const newSkill = prompt('Enter additional skill:');
                      if (newSkill) setCreatorSkills([...creatorSkills, newSkill.trim()]);
                    }}
                    className="px-3 py-1.5 rounded-full bg-surface-container-low text-primary font-label-button text-xs hover:bg-surface-container transition-colors"
                  >
                    + Add Skill
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="font-label-button text-xs font-semibold text-on-surface">Voiceover or Script Language</label>
                <input
                  className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-sm outline-none"
                  type="text"
                  value={scriptLanguage}
                  onChange={(e) => setScriptLanguage(e.target.value)}
                />
              </div>
            </section>

            {/* SECTION 09: REVIEW & VERIFICATION */}
            <section
              id="section-review"
              className="p-6 sm:p-8 rounded-2xl bg-surface-container-lowest shadow-[0_4px_24px_-2px_rgba(99,102,241,0.05)] border border-surface-container/60 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between pb-3 border-b border-surface-container/60">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-semibold text-sm">
                    09
                  </span>
                  <div>
                    <h2 className="font-headline-sm text-lg sm:text-xl text-on-surface font-semibold">Review & Verification</h2>
                    <p className="font-label-caption text-xs text-on-surface-variant">Confirm checklist before publishing to vetted creators.</p>
                  </div>
                </div>
                <span className="font-label-badge text-xs px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed uppercase font-bold tracking-wider">
                  Final Step
                </span>
              </div>

              {/* Verification Checklist */}
              <div className="p-4 rounded-xl bg-surface-container-low flex flex-col gap-3 border border-surface-container/60">
                <h4 className="font-label-button text-xs font-semibold text-on-surface">Pre-Publishing Readiness Checklist</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-on-surface">
                  {[
                    { key: 'objective', label: 'My campaign objective is clear.' },
                    { key: 'deliverables', label: 'The requested deliverables are specific.' },
                    { key: 'direction', label: 'The creative direction is understandable.' },
                    { key: 'deadline', label: `The deadline is realistic (${deadline}).` },
                    { key: 'budget', label: `Budget range (${budgetMin} – ${budgetMax}) is defined.` },
                    { key: 'usage', label: 'The intended content usage is specified.' }
                  ].map(item => (
                    <label key={item.key} className="flex items-center gap-2.5 cursor-pointer">
                      <span className="material-symbols-outlined text-primary text-[20px]">check_circle</span>
                      <span>{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => alert('Draft saved.')}
                  className="w-full sm:w-auto px-6 py-3 rounded-full font-label-button text-xs font-semibold bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors"
                >
                  Save as Draft
                </button>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setIsPreviewModalOpen(true)}
                    className="flex-1 sm:flex-none px-6 py-3 rounded-full font-label-button text-xs font-semibold bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-fixed-dim transition-all shadow-xs"
                  >
                    Preview Brief
                  </button>
                  <button
                    type="button"
                    onClick={handlePublish}
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full font-label-button text-xs font-semibold bg-primary text-on-primary hover:bg-primary-container shadow-md transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                    <span>{isSubmitting ? 'Publishing...' : 'Publish Brief'}</span>
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: Sticky Brief Summary (4 Cols) */}
          <div className="lg:col-span-4 sticky top-20 flex flex-col gap-6">
            <div className="p-6 rounded-2xl bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_8px_32px_-4px_rgba(99,102,241,0.08)] border border-surface-container/60 flex flex-col gap-5">
              {/* Header & Status */}
              <div className="flex items-center justify-between pb-2 border-b border-surface-container/60">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">assignment</span>
                  <span className="font-headline-sm text-base font-semibold text-on-surface">Brief Summary</span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-label-caption text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Ready to Publish</span>
                </span>
              </div>

              {/* Visual Hero Mini-Card */}
              <div className="rounded-xl overflow-hidden relative bg-surface-container h-36">
                <img
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6Ydfe-o-ZY9SbQCLPf_I1SRSsQ9QCOIrG43j4Ja7o8mAnPsfnmY12zwkGVbBX4nIY9bFsRpq7gQoDF4iDpWJJViLhW_dtW_4j-jdQpW8GhUWPK9vcTgZRqvh7SkGIZjVwp29h-TL_qLk79R_4CedZUeB9ZLifYrEiFs_B3FGA0qaC9aPo5iPWM_I7nbxLPD0U0yX_iSYjUxcVFu-Y2Ljyo6Se3Qd4dJhgCXBU9vr6YOt4MXrvV8bX"
                  alt="Serum Mockup"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-surface/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-semibold text-on-primary bg-primary/80 backdrop-blur-md px-2.5 py-0.5 rounded-full">
                    {objective}
                  </span>
                </div>
              </div>

              {/* Brief Title & Meta */}
              <div className="flex flex-col gap-1">
                <h3 className="font-headline-sm text-base text-on-surface leading-tight font-semibold line-clamp-2">
                  {campaignTitle}
                </h3>
                <p className="font-label-caption text-xs text-on-surface-variant flex items-center gap-1">
                  <span>{brandCompany}</span>
                  <span>·</span>
                  <span>{industry}</span>
                </p>
              </div>

              {/* Summary Matrix Badges */}
              <div className="space-y-2.5 pt-2 border-t border-surface-container/60">
                <div className="flex items-center justify-between text-xs font-body">
                  <span className="text-on-surface-variant flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">inventory_2</span>
                    <span>Deliverables</span>
                  </span>
                  <span className="font-semibold text-on-surface">{deliverables.length} Items Listed</span>
                </div>
                <div className="flex items-center justify-between text-xs font-body">
                  <span className="text-on-surface-variant flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">palette</span>
                    <span>Visual Style</span>
                  </span>
                  <span className="font-semibold text-on-surface truncate max-w-[160px] text-right">
                    {visualStyles.slice(0, 2).join(' · ')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-body">
                  <span className="text-on-surface-variant flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">public</span>
                    <span>Platforms</span>
                  </span>
                  <span className="font-semibold text-on-surface">Reels, TikTok, Web</span>
                </div>
                <div className="flex items-center justify-between text-xs font-body">
                  <span className="text-on-surface-variant flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">event</span>
                    <span>Deadline</span>
                  </span>
                  <span className="font-semibold text-on-surface">{deadline}</span>
                </div>
                <div className="flex items-center justify-between text-xs font-body">
                  <span className="text-on-surface-variant flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">payments</span>
                    <span>Budget ({budgetType})</span>
                  </span>
                  <span className="font-semibold text-primary">{budgetMin} – {budgetMax} {currency}</span>
                </div>
              </div>

              {/* Completion Indicator Bar */}
              <div className="flex flex-col gap-2 pt-2 border-t border-surface-container/60">
                <div className="flex items-center justify-between font-label-caption text-xs">
                  <span className="font-semibold text-on-surface">Form Completion</span>
                  <span className="text-primary font-bold">100% (9/9 Sections Complete)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                  <div className="h-full bg-primary rounded-full w-full transition-all duration-500" />
                </div>
              </div>

              {/* Sticky Quick CTAs */}
              <div className="flex flex-col gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => setIsPreviewModalOpen(true)}
                  className="w-full py-2.5 rounded-full font-label-button text-xs font-semibold bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">visibility</span>
                  <span>Preview Creator View</span>
                </button>
                <button
                  type="button"
                  onClick={handlePublish}
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-full font-label-button text-xs font-semibold bg-primary text-on-primary hover:bg-primary-container shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
                  <span>{isSubmitting ? 'Publishing...' : 'Publish Campaign Brief'}</span>
                </button>
              </div>

              {/* Escrow Guarantee Badge */}
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-surface-container-low text-on-surface-variant text-xs border border-surface-container/60">
                <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">shield</span>
                <span className="leading-tight">
                  Funds are held safely in escrow until you approve final milestone deliverables.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ADD DELIVERABLE MODAL */}
      {showAddDeliverableModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-surface-container space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-surface-container/60">
              <h3 className="font-headline-sm text-base font-semibold text-on-surface">Add Custom Deliverable</h3>
              <button
                onClick={() => setShowAddDeliverableModal(false)}
                className="p-1 rounded-full hover:bg-surface-container text-on-surface-variant"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-on-surface block mb-1">Deliverable Title</label>
                <input
                  type="text"
                  placeholder="e.g. 15s Story Ad Cut"
                  value={newDelivTitle}
                  onChange={(e) => setNewDelivTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-container-low text-xs outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-xs font-semibold text-on-surface block mb-1">Quantity</label>
                  <input
                    type="number"
                    min={1}
                    value={newDelivQty}
                    onChange={(e) => setNewDelivQty(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-container-low text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-on-surface block mb-1">Aspect Ratio</label>
                  <input
                    type="text"
                    value={newDelivAspect}
                    onChange={(e) => setNewDelivAspect(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-container-low text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-on-surface block mb-1">Duration / Res</label>
                  <input
                    type="text"
                    value={newDelivDuration}
                    onChange={(e) => setNewDelivDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-surface-container-low text-xs outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-on-surface block mb-1">Description / Technical Notes</label>
                <textarea
                  rows={2}
                  placeholder="Specific requirements for this asset..."
                  value={newDelivDesc}
                  onChange={(e) => setNewDelivDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-surface-container-low text-xs outline-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-surface-container/60">
              <button
                type="button"
                onClick={() => setShowAddDeliverableModal(false)}
                className="px-4 py-2 rounded-full text-xs font-semibold bg-surface-container-low text-on-surface"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleAddDeliverable}
                className="px-5 py-2 rounded-full text-xs font-semibold bg-primary text-on-primary hover:bg-primary-container"
              >
                Add Deliverable
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CREATOR-FACING PREVIEW MODAL */}
      {isPreviewModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="relative w-full max-w-3xl rounded-3xl bg-surface-container-lowest shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden my-8 border border-surface-container animate-scale-in">
            {/* Modal Header */}
            <div className="p-6 bg-gradient-to-r from-primary-fixed to-secondary-fixed flex items-start justify-between">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-0.5 rounded-full bg-surface-container-lowest/80 text-primary font-label-badge text-xs uppercase font-bold tracking-wider">
                    Preview Mode · Creator View
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container-lowest/80 text-on-surface font-label-caption text-xs flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-primary text-[14px]">verified</span>
                    <span>{brandCompany}</span>
                  </span>
                </div>
                <h2 className="font-headline-sm text-xl text-on-surface font-semibold">
                  {campaignTitle}
                </h2>
              </div>
              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="w-9 h-9 rounded-full bg-surface-container-lowest/80 text-on-surface hover:bg-surface-container-lowest flex items-center justify-center transition-colors cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 flex flex-col gap-6 max-h-[70vh] overflow-y-auto">
              {/* Creator Header Action Strip */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-surface-container-low border border-surface-container/60">
                <div className="flex items-center gap-6">
                  <div>
                    <div className="font-label-caption text-xs text-on-surface-variant">Compensation Range</div>
                    <div className="font-headline-sm text-lg text-primary font-bold">
                      {budgetMin} – {budgetMax} {currency}
                    </div>
                  </div>
                  <div>
                    <div className="font-label-caption text-xs text-on-surface-variant">Deadline</div>
                    <div className="font-label-button text-xs font-semibold text-on-surface">{deadline}</div>
                  </div>
                  <div>
                    <div className="font-label-caption text-xs text-on-surface-variant">Deliverables</div>
                    <div className="font-label-button text-xs font-semibold text-on-surface">
                      {deliverables.length} Assets Listed
                    </div>
                  </div>
                </div>
                <span className="px-5 py-2 rounded-full bg-primary text-on-primary font-label-button text-xs font-semibold shadow-xs">
                  Pitch / Submit Proposal
                </span>
              </div>

              {/* Creative Direction */}
              <div className="flex flex-col gap-2">
                <h3 className="font-headline-sm text-sm text-on-surface font-semibold">Creative Direction</h3>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed">
                  {creativeDirection}
                </p>
              </div>

              {/* Deliverables Breakdown */}
              <div className="flex flex-col gap-2">
                <h3 className="font-headline-sm text-sm text-on-surface font-semibold">Deliverables Breakdown</h3>
                <div className="space-y-2">
                  {deliverables.map(deliv => (
                    <div
                      key={deliv.id}
                      className="p-3.5 rounded-xl bg-surface-container-low flex justify-between items-center text-xs"
                    >
                      <span className="font-semibold text-on-surface">
                        {deliv.qty}x {deliv.title} ({deliv.aspect}, {deliv.duration})
                      </span>
                      <span className="text-on-surface-variant">{deliv.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rights & Licensing */}
              <div className="flex flex-col gap-2">
                <h3 className="font-headline-sm text-sm text-on-surface font-semibold">Licensing & IP</h3>
                <div className="p-4 rounded-xl bg-surface-container-low grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="font-semibold text-on-surface">Usage Scope:</span>
                    <span className="text-on-surface-variant ml-1">{geographicScope} {intendedUsage}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-on-surface">Exclusivity:</span>
                    <span className="text-on-surface-variant ml-1">{exclusivity}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-on-surface">Duration:</span>
                    <span className="text-on-surface-variant ml-1">{usageDuration}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-on-surface">Source Files:</span>
                    <span className="text-on-surface-variant ml-1">{fileHandover}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-surface-container flex items-center justify-between">
              <span className="font-label-caption text-xs text-on-surface-variant">
                This is how your brief appears in the Creator Opportunity Board.
              </span>
              <button
                onClick={() => setIsPreviewModalOpen(false)}
                className="px-5 py-2 rounded-full bg-surface-container-lowest text-on-surface font-label-button text-xs font-semibold hover:bg-surface-container-high transition-colors"
                type="button"
              >
                Exit Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification */}
      {publishSuccess && (
        <div className="fixed bottom-8 right-8 z-50 bg-surface-container-lowest border border-emerald-500 p-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-slide-in">
          <span className="material-symbols-outlined text-emerald-500 text-[24px]">check_circle</span>
          <div>
            <div className="font-semibold text-sm text-on-surface">Campaign Brief Published!</div>
            <div className="text-xs text-on-surface-variant">Redirecting to your campaign dashboard...</div>
          </div>
        </div>
      )}
    </div>
  );
}
