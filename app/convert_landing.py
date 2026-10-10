import os
import re
from bs4 import BeautifulSoup, Comment, NavigableString, Tag

source_path = r"c:\Users\shame\Downloads\INOMARK\stitch_inomark_ai_creator_marketplace (8)\stitch_inomark_ai_creator_marketplace\inomark_long_form_ai_creator_marketplace_landing_page\code.html"
target_path = r"c:\Users\shame\Downloads\INOMARK\app\src\pages\LandingPage.tsx"

with open(source_path, "r", encoding="utf-8") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")
body = soup.body

# Convert style string to JSX object string
def style_to_jsx(style_str):
    parts = [p.strip() for p in style_str.split(";") if p.strip()]
    obj_props = []
    for p in parts:
        if ":" in p:
            k, v = p.split(":", 1)
            k = k.strip()
            v = v.strip().replace("'", "\\'")
            # camelCase key
            camel_k = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), k)
            obj_props.append(f"'{camel_k}': '{v}'")
    return "{{" + ", ".join(obj_props) + "}}"

ATTR_MAP = {
    "class": "className",
    "for": "htmlFor",
    "tabindex": "tabIndex",
    "autocomplete": "autoComplete",
    "viewbox": "viewBox",
    "fill-rule": "fillRule",
    "clip-rule": "clipRule",
    "stroke-width": "strokeWidth",
    "stroke-linecap": "strokeLinecap",
    "stroke-linejoin": "strokeLinejoin",
    "srcset": "srcSet",
    "crossorigin": "crossOrigin",
    "maxlength": "maxLength",
    "minlength": "minLength",
    "readonly": "readOnly",
    "autofocus": "autoFocus",
}

VOID_TAGS = {"img", "input", "br", "hr", "meta", "link", "source"}

def render_node(node, depth=0):
    indent = "  " * depth
    if isinstance(node, Comment):
        # Return JSX comment
        return f"{indent}{{/* {node.strip()} */}}\n"
    if isinstance(node, NavigableString):
        text = str(node)
        if not text.strip():
            return ""
        # Escape curly braces in raw text if any
        text = text.replace("{", "&#123;").replace("}", "&#125;")
        return text
    
    if isinstance(node, Tag):
        tag_name = node.name.lower()
        if tag_name == "script":
            return "" # Skip scripts, handled in React component
        
        # Build attributes
        attrs = []
        for k, v in node.attrs.items():
            if isinstance(v, list):
                v = " ".join(v)
            jsx_k = ATTR_MAP.get(k.lower(), k)
            if k == "style":
                attrs.append(f"style={style_to_jsx(v)}")
            elif k.lower() == "onclick":
                # handle known onclicks
                val = str(v).strip()
                if "openAuthModal" in val:
                    if "'creator'" in val or '"creator"' in val:
                        attrs.append("onClick={() => handleOpenAuthModal('creator')}")
                    elif "'brand'" in val or '"brand"' in val:
                        attrs.append("onClick={() => handleOpenAuthModal('brand')}")
                    else:
                        attrs.append("onClick={() => handleOpenAuthModal('default')}")
                elif "closeAuthModal" in val:
                    attrs.append("onClick={handleCloseAuthModal}")
                elif "selectAccountRole" in val:
                    if "'creator'" in val or '"creator"' in val:
                        attrs.append("onClick={() => handleSelectRole('creator')}")
                    else:
                        attrs.append("onClick={() => handleSelectRole('brand')}")
                else:
                    attrs.append(f"onClick={{() => {{ /* {val} */ }}}}")
            elif isinstance(v, bool):
                if v:
                    attrs.append(jsx_k)
            else:
                escaped_v = str(v).replace('"', '&quot;')
                attrs.append(f'{jsx_k}="{escaped_v}"')
        
        attr_str = (" " + " ".join(attrs)) if attrs else ""
        
        if tag_name in VOID_TAGS:
            return f"<{tag_name}{attr_str} />"
        
        children_str = "".join(render_node(c, depth + 1) for c in node.children)
        return f"<{tag_name}{attr_str}>{children_str}</{tag_name}>"

jsx_children = []
for child in body.children:
    res = render_node(child, 1)
    if res.strip():
        jsx_children.append(res)

full_body_jsx = "".join(jsx_children)

react_component = f"""import {{ useState }} from 'react';
import {{ useNavigate, Link }} from 'react-router-dom';

export default function LandingPage() {{
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Welcome to Inomark');

  const handleOpenAuthModal = (role?: string) => {{
    if (role === 'creator') {{
      setModalTitle('Join Inomark as a Creator');
    }} else if (role === 'brand') {{
      setModalTitle('Hire Talent as a Brand');
    }} else {{
      setModalTitle('Welcome to Inomark');
    }}
    setIsAuthModalOpen(true);
  }};

  const handleCloseAuthModal = () => {{
    setIsAuthModalOpen(false);
  }};

  const handleSelectRole = (role: string) => {{
    setIsAuthModalOpen(false);
    if (role === 'creator') {{
      navigate('/creator/signup');
    }} else {{
      navigate('/brand/signup');
    }}
  }};

  return (
    <div className="bg-[#faf8ff] font-sans text-[#131b2e] antialiased selection:bg-[#eaddff] selection:text-[#25005a] relative min-h-screen">
      {full_body_jsx}

      {{/* Interactive React Role Selection Modal */}}
      {{isAuthModalOpen && (
        <div
          id="authModal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#131b2e]/40 backdrop-blur-md transition-opacity duration-300"
          onClick={{(e) => {{
            if (e.target === e.currentTarget) handleCloseAuthModal();
          }}}}
        >
          <div
            id="authModalCard"
            className="w-full max-w-lg bg-white rounded-3xl p-8 border border-[#e2e7ff] shadow-[0_24px_48px_-12px_rgba(113,42,226,0.18)] transition-all duration-300 transform scale-100"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-[#712ae2] text-xl font-bold">✦</span>
                <h3 id="modalTitle" className="font-serif text-2xl font-bold text-[#131b2e]">
                  {{modalTitle}}
                </h3>
              </div>
              <button
                onClick={{handleCloseAuthModal}}
                className="w-9 h-9 rounded-full flex items-center justify-center text-[#767586] hover:text-[#131b2e] hover:bg-[#eaedff] transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <p className="text-[14px] text-[#464554] mb-8">
              Select how you would like to participate in the premier generative AI creative marketplace:
            </p>

            <div className="space-y-4 mb-6">
              <button
                onClick={{() => handleSelectRole('creator')}}
                className="w-full text-left p-5 rounded-2xl border-2 border-[#e2e7ff] hover:border-[#712ae2] bg-[#faf8ff] hover:bg-[#f2f3ff] transition-all group flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#eaddff] flex items-center justify-center text-[#712ae2] shrink-0 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">palette</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-[16px] text-[#131b2e] group-hover:text-[#712ae2] transition-colors">
                      I am an AI Creator / Director
                    </h4>
                    <span className="material-symbols-outlined text-[18px] text-[#767586] group-hover:text-[#712ae2] group-hover:translate-x-1 transition-all">
                      arrow_forward
                    </span>
                  </div>
                  <p className="text-[13px] text-[#464554] mt-1">
                    Showcase your synthetic portfolio, apply to commercial campaign briefs, and earn with guaranteed escrow buyouts.
                  </p>
                </div>
              </button>

              <button
                onClick={{() => handleSelectRole('brand')}}
                className="w-full text-left p-5 rounded-2xl border-2 border-[#e2e7ff] hover:border-[#712ae2] bg-[#faf8ff] hover:bg-[#f2f3ff] transition-all group flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#c4e7ff] flex items-center justify-center text-[#006387] shrink-0 group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[24px]">business_center</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-[16px] text-[#131b2e] group-hover:text-[#712ae2] transition-colors">
                      I represent a Brand or Agency
                    </h4>
                    <span className="material-symbols-outlined text-[18px] text-[#767586] group-hover:text-[#712ae2] group-hover:translate-x-1 transition-all">
                      arrow_forward
                    </span>
                  </div>
                  <p className="text-[13px] text-[#464554] mt-1">
                    Post production briefs, discover vetted commercial AI visualists, review pitches, and license turnkey assets.
                  </p>
                </div>
              </button>
            </div>

            <div className="text-center pt-2 border-t border-[#eaedff]">
              <p className="text-[13px] text-[#767586]">
                Already have an account?{{' '}}
                <Link to="/creator/login" className="text-[#712ae2] font-semibold hover:underline">
                  Log in as Creator
                </Link>
                {{' '}}or{{' '}}
                <Link to="/brand/login" className="text-[#712ae2] font-semibold hover:underline">
                  Brand Studio
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}}
    </div>
  );
}}
"""

with open(target_path, "w", encoding="utf-8") as f:
    f.write(react_component)

print("Generated LandingPage.tsx successfully!")
