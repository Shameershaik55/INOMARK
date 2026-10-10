export interface SocialComment {
  id: string;
  user_name: string;
  user_avatar: string;
  user_role: 'creator' | 'brand';
  text: string;
  created_at: string;
  likes: number;
}

export interface SocialItem {
  id: string;
  type: 'post' | 'reel';
  creator_id: string;
  creator_name: string;
  creator_avatar: string;
  creator_headline: string;
  title: string;
  caption: string;
  media_url: string; // Image or poster
  video_url?: string; // Only for reels
  aspect_ratio: '3:4' | '1:1' | '9:16' | '4:5' | '16:9';
  ai_tools: string[];
  prompt?: string;
  category: string;
  tags: string[];
  likes_count: number;
  is_liked?: boolean;
  comments_count: number;
  shares_count: number;
  saves_count: number;
  is_saved?: boolean;
  audio_track?: string;
  views_count: number;
  created_at: string;
  comments: SocialComment[];
}

export const MOCK_SOCIAL_POSTS: SocialItem[] = [
  {
    id: 'sp-1',
    type: 'post',
    creator_id: 'c-elena-vance',
    creator_name: 'Elena Vance',
    creator_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    creator_headline: 'Pro AI Director ✦ Milan / Berlin',
    title: 'Ethereal Bioluminescent Botanical Flora',
    caption: 'Macro exploration combining FLUX.1 depth conditioning with organic chlorophyll caustic simulations for Aura Botanica campaign pitch.',
    media_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=85',
    aspect_ratio: '3:4',
    ai_tools: ['FLUX.1 Dev', 'ComfyUI', 'Magnific AI'],
    prompt: 'Macro photography of bioluminescent nocturnal orchid, glasshouse dew droplets refracted with prismatic neon emerald lights, Hasselblad 120mm macro, 8k resolution, raw realism --ar 3:4 --v 6.1',
    category: 'Botanical & Beauty',
    tags: ['#GenerativeBotanics', '#FLUX1', '#BioLuminescent', '#CleanBeauty', '#CommercialMacro'],
    likes_count: 1420,
    is_liked: false,
    comments_count: 38,
    shares_count: 94,
    saves_count: 412,
    is_saved: false,
    views_count: 18400,
    created_at: '2 hours ago',
    comments: [
      {
        id: 'c-1',
        user_name: 'Aura Botanica',
        user_avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
        user_role: 'brand',
        text: 'The translucent cellular refraction on this leaf petal is breathtaking. Elena, we would love to commission a 15s packshot variation for our Summer Solstice serum.',
        created_at: '1 hour ago',
        likes: 14
      },
      {
        id: 'c-2',
        user_name: 'Kaelen Mori',
        user_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        user_role: 'creator',
        text: 'Did you use a depth map LoRA for the droplet dispersion or native FLUX latent upscaling? Incredible edge crispness!',
        created_at: '45 mins ago',
        likes: 8
      }
    ]
  },
  {
    id: 'sp-2',
    type: 'post',
    creator_id: 'c-kaelen-mori',
    creator_name: 'Kaelen Mori',
    creator_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    creator_headline: 'Synthetic Photographer & 3D Spatial Designer',
    title: 'Kinetic Perfume Caustics & Liquid Ribbons',
    caption: 'Procedural raymarching study with Midjourney v6 + Blender octanes. Exploring refractive indices of bespoke heavy-glass perfume flacons.',
    media_url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85',
    aspect_ratio: '4:5',
    ai_tools: ['Midjourney v6.1', 'Blender', 'Topaz Gigapixel'],
    prompt: 'Sculptural architectural perfume bottle resting in calm crystalline tide pool, dramatic golden hour caustics, floating saffron petals, 100mm tilt-shift lens --stylize 300',
    category: 'Luxury Packshots',
    tags: ['#HauteParfum', '#RefractionStudy', '#OctaneRender', '#MidjourneyV6', '#ProductDesign'],
    likes_count: 980,
    is_liked: false,
    comments_count: 24,
    shares_count: 52,
    saves_count: 320,
    is_saved: false,
    views_count: 12100,
    created_at: '5 hours ago',
    comments: [
      {
        id: 'c-3',
        user_name: 'Valence Studio',
        user_avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
        user_role: 'brand',
        text: 'Incredible lighting control. Sending a direct inquiry regarding our upcoming fragrance line.',
        created_at: '3 hours ago',
        likes: 5
      }
    ]
  },
  {
    id: 'sp-3',
    type: 'post',
    creator_id: 'c-maya-lin',
    creator_name: 'Maya Lin',
    creator_avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    creator_headline: 'Generative Couture & Virtual Fashion Lead',
    title: 'Iridescent Organza Cyber-Couture Paris',
    caption: 'Hybrid CLO3D + Kling 1.5 fashion editorial. Liquid organza textiles with real-time dynamic wind physics.',
    media_url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=85',
    aspect_ratio: '3:4',
    ai_tools: ['CLO3D', 'Kling 1.5', 'FLUX.1 Dev'],
    prompt: 'Avant-garde Paris fashion week couture cape sculpted from iridescent molten glass fibers, floating in brutalist concrete atrium, high key lighting, Vogue Italia editorial --ar 3:4',
    category: 'Virtual Fashion',
    tags: ['#CyberCouture', '#DigitalFashion', '#VogueItalia', '#GenerativeTextiles'],
    likes_count: 2310,
    is_liked: true,
    comments_count: 67,
    shares_count: 180,
    saves_count: 890,
    is_saved: true,
    views_count: 34500,
    created_at: '8 hours ago',
    comments: []
  },
  {
    id: 'sp-4',
    type: 'post',
    creator_id: 'c-david-thorne',
    creator_name: 'David Thorne',
    creator_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    creator_headline: 'AI Automotive Visualizer & CGI Director',
    title: 'Hyper-EV Monolith at Bonneville Salt Flats',
    caption: 'Conceptual hypercar aerodynamic surfacing generated via custom automotive ComfyUI checkpoint and Unreal 5 environment pass.',
    media_url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=85',
    aspect_ratio: '16:9',
    ai_tools: ['ComfyUI', 'Unreal Engine 5.4', 'Photoshop'],
    prompt: 'Autonomous minimalist electric hypercar speeding across Bonneville salt flats at twilight, mirror salt reflection, aero vortex condensation trails, shot on Arri Alexa 65',
    category: 'Automotive & CGI',
    tags: ['#ConceptCar', '#AutomotiveDesign', '#ComfyUI', '#CGIRealism'],
    likes_count: 1640,
    is_liked: false,
    comments_count: 41,
    shares_count: 112,
    saves_count: 530,
    is_saved: false,
    views_count: 22000,
    created_at: '1 day ago',
    comments: []
  },
  {
    id: 'sp-5',
    type: 'post',
    creator_id: 'c-elena-vance',
    creator_name: 'Elena Vance',
    creator_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    creator_headline: 'Pro AI Director ✦ Milan / Berlin',
    title: 'Microcellular Hydration Droplets in Rose Quartz',
    caption: 'Experimental skin science visual assets for a clinical skincare brand campaign. Pure optical translucency.',
    media_url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=85',
    aspect_ratio: '1:1',
    ai_tools: ['FLUX.1 Schnell', 'Runway Gen-3'],
    prompt: 'Microcellular hydration sphere resting on polished rose quartz slab, internal molecular suspension, soft laboratory studio diffusion, ultra-clean commercial aesthetic',
    category: 'Botanical & Beauty',
    tags: ['#SkinScience', '#BeautyEditorial', '#BiophilicDesign', '#Packaging'],
    likes_count: 875,
    is_liked: false,
    comments_count: 19,
    shares_count: 44,
    saves_count: 290,
    is_saved: false,
    views_count: 9800,
    created_at: '1 day ago',
    comments: []
  },
  {
    id: 'sp-6',
    type: 'post',
    creator_id: 'c-kaelen-mori',
    creator_name: 'Kaelen Mori',
    creator_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    creator_headline: 'Synthetic Photographer & 3D Spatial Designer',
    title: 'Kyoto Mist Temple Brutalism',
    caption: 'Merging Japanese cedar carpentry with raw rammed earth and generative mist simulation.',
    media_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    aspect_ratio: '3:4',
    ai_tools: ['Midjourney v6.1', 'ComfyUI'],
    prompt: 'Architectural pavilion in Arashiyama bamboo forest in dense dawn mist, raw charred cedar wood and cast glass facade, minimalist serene composition --ar 3:4',
    category: 'Spatial Architecture',
    tags: ['#WabiSabi', '#GenerativeArchitecture', '#KyotoVibes', '#InteriorDesign'],
    likes_count: 1890,
    is_liked: false,
    comments_count: 53,
    shares_count: 145,
    saves_count: 670,
    is_saved: false,
    views_count: 27100,
    created_at: '2 days ago',
    comments: []
  }
];

export const MOCK_SOCIAL_REELS: SocialItem[] = [
  {
    id: 'sr-1',
    type: 'reel',
    creator_id: 'c-elena-vance',
    creator_name: 'Elena Vance',
    creator_avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    creator_headline: 'Pro AI Director ✦ Milan / Berlin',
    title: 'Cybernetic Neon Metamorphosis',
    caption: '120fps fluid physics generated via Runway Gen-3 Alpha with custom camera motion keyframing. Perfect loop for luxury clubwear.',
    media_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=85',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-cyberpunk-city-street-with-neon-lights-41007-large.mp4',
    aspect_ratio: '9:16',
    ai_tools: ['Runway Gen-3 Alpha', 'After Effects', 'FLUX.1'],
    prompt: 'Continuous tracking shot traveling down subterranean Tokyo alley filled with holographic neon rain, iridescent liquid spills reflecting violet laser signs, 4k 60fps',
    category: 'VFX & Motion',
    tags: ['#RunwayGen3', '#AIReels', '#CyberpunkMotion', '#LoopAnimation'],
    audio_track: '🎵 Elena Vance — Neo Tokyo Synth (Original Sound)',
    likes_count: 4890,
    is_liked: true,
    comments_count: 142,
    shares_count: 530,
    saves_count: 1280,
    is_saved: true,
    views_count: 78500,
    created_at: '4 hours ago',
    comments: [
      {
        id: 'cr-1',
        user_name: 'David Thorne',
        user_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        user_role: 'creator',
        text: 'The temporal coherence on the puddle reflections is insane! Did you run frame interpolation in Topaz or native 60fps?',
        created_at: '2 hours ago',
        likes: 24
      },
      {
        id: 'cr-2',
        user_name: 'Lumina Media',
        user_avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80',
        user_role: 'brand',
        text: 'Elena, we are licensing this clip for our billboard takeover in Shibuya! Check your brief proposals inbox.',
        created_at: '1 hour ago',
        likes: 31
      }
    ]
  },
  {
    id: 'sr-2',
    type: 'reel',
    creator_id: 'c-maya-lin',
    creator_name: 'Maya Lin',
    creator_avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    creator_headline: 'Generative Couture & Virtual Fashion Lead',
    title: 'Hypnotic Fluid Ink Dynamics',
    caption: 'Procedural dye infusion simulated with Kling 1.5 camera roll. Exploring sensorial visual ASMR for cosmetic brand launches.',
    media_url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=85',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-ink-swirling-in-water-43387-large.mp4',
    aspect_ratio: '9:16',
    ai_tools: ['Kling 1.5 Pro', 'Midjourney v6.1'],
    prompt: 'Macro slow motion shot of gold leaf suspended in swirling ultramarine and saffron liquid pigments, volumetric prism light, ASMR fluidity',
    category: 'Botanical & Beauty',
    tags: ['#FluidDynamics', '#KlingAI', '#VisualASMR', '#ColorStudy'],
    audio_track: '🎵 Ambient Waves — Caustic Serenade',
    likes_count: 3410,
    is_liked: false,
    comments_count: 88,
    shares_count: 310,
    saves_count: 940,
    is_saved: false,
    views_count: 51200,
    created_at: '9 hours ago',
    comments: []
  },
  {
    id: 'sr-3',
    type: 'reel',
    creator_id: 'c-kaelen-mori',
    creator_name: 'Kaelen Mori',
    creator_avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    creator_headline: 'Synthetic Photographer & 3D Spatial Designer',
    title: 'Abstract Laser Architectural Horizon',
    caption: 'Volumetric laser lattice designed for a high-end luxury audio visual identity campaign. Luma Dream Machine motion pass.',
    media_url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=85',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-laser-lights-background-animation-42512-large.mp4',
    aspect_ratio: '9:16',
    ai_tools: ['Luma Dream Machine', 'TouchDesigner', 'ComfyUI'],
    prompt: 'Geometric emerald laser array pulsing through atmospheric haze in black mirror chamber, precise rhythm, cinematic 9:16',
    category: 'VFX & Motion',
    tags: ['#LaserArt', '#LumaAI', '#GenerativeMotion', '#SpatialAudio'],
    audio_track: '🎵 Spatial Lab — 128 BPM Pulse Master',
    likes_count: 2780,
    is_liked: false,
    comments_count: 54,
    shares_count: 198,
    saves_count: 610,
    is_saved: false,
    views_count: 42000,
    created_at: '1 day ago',
    comments: []
  },
  {
    id: 'sr-4',
    type: 'reel',
    creator_id: 'c-david-thorne',
    creator_name: 'David Thorne',
    creator_avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    creator_headline: 'AI Automotive Visualizer & CGI Director',
    title: 'Futuristic Megacity Drone Orbit',
    caption: 'Continuous 360-degree drone orbit around a 2080 biometric skybridge. Sora alpha reference study.',
    media_url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=85',
    video_url: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-urban-city-at-night-41584-large.mp4',
    aspect_ratio: '9:16',
    ai_tools: ['Sora AI', 'Unreal Engine 5', 'DaVinci Resolve'],
    prompt: 'FPV drone diving through skyscraper canyon illuminated by floating holographic banners and rain reflections, cinematic speed ramp',
    category: 'Automotive & CGI',
    tags: ['#SoraAI', '#CyberCity', '#CinematicDrone', '#MotionDesign'],
    audio_track: '🎵 Thorne Cinematic — Metropolis Midnight',
    likes_count: 5920,
    is_liked: false,
    comments_count: 174,
    shares_count: 780,
    saves_count: 1650,
    is_saved: false,
    views_count: 94000,
    created_at: '2 days ago',
    comments: []
  }
];
