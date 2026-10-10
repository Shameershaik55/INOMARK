import os
import re
from bs4 import BeautifulSoup, Comment, NavigableString, Tag

base_dir = r"c:\Users\shame\Downloads\INOMARK\stitch_inomark_ai_creator_marketplace (8)\stitch_inomark_ai_creator_marketplace"
app_src = r"c:\Users\shame\Downloads\INOMARK\app\src"

# Mapping from stitch folder to destination TSX file
SCREEN_MAPPING = {
    "creator_login_inomark": os.path.join(app_src, "pages", "auth", "CreatorLogin.tsx"),
    "creator_sign_up_inomark": os.path.join(app_src, "pages", "auth", "CreatorSignup.tsx"),
    "brand_login_inomark": os.path.join(app_src, "pages", "auth", "BrandLogin.tsx"),
    "brand_sign_up_inomark": os.path.join(app_src, "pages", "auth", "BrandSignup.tsx"),
    
    "creator_showcase_profile_elena_vance_inomark": os.path.join(app_src, "pages", "public", "CreatorPublicProfile.tsx"),
    "brand_showcase_profile_aura_botanica_inomark": os.path.join(app_src, "pages", "public", "BrandPublicProfile.tsx"),
    
    "inomark_creator_dashboard_home": os.path.join(app_src, "pages", "creator", "CreatorDashboard.tsx"),
    "my_profile_inomark": os.path.join(app_src, "pages", "creator", "CreatorProfilePage.tsx"),
    "my_portfolio_inomark": os.path.join(app_src, "pages", "creator", "CreatorPortfolioPage.tsx"),
    "discover_brands_inomark": os.path.join(app_src, "pages", "creator", "ExploreBrandsPage.tsx"),
    "brand_briefs_inomark": os.path.join(app_src, "pages", "creator", "CreatorBriefsPage.tsx"),
    "brand_brief_detail_nordic_botanical_serum_inomark": os.path.join(app_src, "pages", "creator", "BriefDetailPage.tsx"),
    "my_applications_inomark_creator_dashboard": os.path.join(app_src, "pages", "creator", "CreatorApplicationsPage.tsx"),
    
    "brand_dashboard_home": os.path.join(app_src, "pages", "brand", "BrandDashboard.tsx"),
    "discover_creators_inomark_spacious_gallery": os.path.join(app_src, "pages", "brand", "DiscoverCreatorsPage.tsx"),
    "saved_creators_inomark": os.path.join(app_src, "pages", "brand", "SavedCreatorsPage.tsx"),
    "my_briefs_inomark_brand_dashboard": os.path.join(app_src, "pages", "brand", "BrandBriefsPage.tsx"),
    "create_campaign_brief_inomark": os.path.join(app_src, "pages", "brand", "CreateBriefPage.tsx"),
    "applications_inomark_brand_dashboard": os.path.join(app_src, "pages", "brand", "BrandBriefApplicationsPage.tsx"),
    "view_applications_inomark_brand_dashboard": os.path.join(app_src, "pages", "brand", "ApplicationDetailPage.tsx"),
    "brand_profile_inomark": os.path.join(app_src, "pages", "brand", "BrandProfilePage.tsx"),
}

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
    "novalidate": "noValidate",
}

VOID_TAGS = {"img", "input", "br", "hr", "meta", "link", "source"}

def style_to_jsx(style_str):
    parts = [p.strip() for p in style_str.split(";") if p.strip()]
    obj_props = []
    for p in parts:
        if ":" in p:
            k, v = p.split(":", 1)
            k = k.strip()
            v = v.strip().replace("'", "\\'")
            camel_k = re.sub(r'-([a-z])', lambda m: m.group(1).upper(), k)
            obj_props.append(f"'{camel_k}': '{v}'")
    return "{{" + ", ".join(obj_props) + "}}"

def map_nav_link(tag, folder):
    data_path = tag.get("data-path", "").lower()
    text = tag.get_text(strip=True).lower()
    
    # Creator navigation
    if "creator" in folder or "my_" in folder or "discover_brands" in folder or "nordic" in folder:
        if data_path in ["home", "dashboard"] or text == "home":
            return "/creator/dashboard"
        elif data_path in ["my-profile", "profile"] or text == "my profile":
            return "/creator/profile"
        elif data_path in ["my-portfolio", "portfolio"] or text == "my portfolio":
            return "/creator/portfolio"
        elif data_path in ["explore-brands", "brands"] or text == "explore brands":
            return "/creator/brands"
        elif data_path in ["brand-briefs", "briefs"] or text == "brand briefs":
            return "/creator/briefs"
        elif data_path in ["my-applications", "applications"] or text == "my applications":
            return "/creator/applications"
        elif data_path == "login" or "log out" in text:
            return "/creator/login"
            
    # Brand navigation
    if "brand" in folder or "saved_creators" in folder or "discover_creators" in folder or "create_campaign" in folder or "view_applications" in folder:
        if data_path in ["home", "dashboard"] or text == "home":
            return "/brand/dashboard"
        elif data_path in ["discover-creators", "creators"] or "discover creators" in text:
            return "/brand/creators"
        elif data_path in ["saved-creators", "saved"] or "saved creators" in text:
            return "/brand/saved"
        elif data_path in ["my-briefs", "briefs"] or "my briefs" in text:
            return "/brand/briefs"
        elif data_path in ["create-brief", "create"] or "create brief" in text or "create a campaign brief" in text or "post a custom campaign brief" in text:
            return "/brand/briefs/create"
        elif data_path in ["applications", "view-applications"] or "applications" in text:
            return "/brand/applications"
        elif data_path in ["brand-profile", "profile"] or "brand profile" in text:
            return "/brand/profile"
        elif data_path == "login" or "log out" in text:
            return "/brand/login"

    return None

def render_node(node, folder, depth=0):
    indent = "  " * depth
    if isinstance(node, Comment):
        return f"{indent}{{/* {node.strip()} */}}\n"
    if isinstance(node, NavigableString):
        text = str(node)
        if not text.strip():
            return ""
        text = text.replace("<", "&lt;").replace(">", "&gt;").replace("{", "&#123;").replace("}", "&#125;")
        return text
    
    if isinstance(node, Tag):
        tag_name = node.name.lower()
        if tag_name == "script":
            return "" # omit script tags
        
        # Check if tag is an anchor that can be mapped to React Link
        is_link = False
        target_route = None
        if tag_name == "a":
            target_route = map_nav_link(node, folder)
            if target_route:
                tag_name = "Link"
                is_link = True
        
        attrs = []
        for k, v in node.attrs.items():
            if isinstance(v, list):
                v = " ".join(v)
            jsx_k = ATTR_MAP.get(k.lower(), k)
            
            if is_link and k == "href":
                attrs.append(f'to="{target_route}"')
                continue
            elif is_link and k == "data-path":
                continue # no need for data-path on Link
                
            BOOLEAN_ATTRS = {"disabled", "checked", "readonly", "required", "autofocus", "multiple", "selected", "novalidate"}
            NUMBER_ATTRS = {"rows", "cols", "tabindex", "span", "maxlength", "minlength"}

            if k.lower() in BOOLEAN_ATTRS:
                attrs.append(f"{jsx_k}={{true}}")
            elif k.lower() in NUMBER_ATTRS and str(v).isdigit():
                attrs.append(f"{jsx_k}={{{int(v)}}}")
            elif k == "style":
                attrs.append(f"style={style_to_jsx(v)}")
            elif k.lower().startswith("on"):
                # Clean event handler
                attrs.append(f"onClick={{() => {{ /* interaction */ }}}}")
            elif isinstance(v, bool):
                if v:
                    attrs.append(f"{jsx_k}={{true}}")
            else:
                escaped_v = str(v).replace('"', '&quot;')
                attrs.append(f'{jsx_k}="{escaped_v}"')
        
        attr_str = (" " + " ".join(attrs)) if attrs else ""
        
        if tag_name in VOID_TAGS:
            return f"<{tag_name}{attr_str} />"
        
        children_str = "".join(render_node(c, folder, depth + 1) for c in node.children)
        return f"<{tag_name}{attr_str}>{children_str}</{tag_name}>"

def convert_folder(folder, target_file):
    source_file = os.path.join(base_dir, folder, "code.html")
    if not os.path.exists(source_file):
        print(f"Skipping {folder}: code.html not found")
        return
    
    with open(source_file, "r", encoding="utf-8") as f:
        html = f.read()
    
    soup = BeautifulSoup(html, "html.parser")
    body = soup.body
    if not body:
        print(f"Skipping {folder}: no body tag")
        return
        
    jsx_nodes = []
    for c in body.children:
        rendered = render_node(c, folder, 1)
        if rendered.strip():
            jsx_nodes.append(rendered)
            
    body_jsx = "".join(jsx_nodes)
    
    # Determine component name
    filename = os.path.basename(target_file)
    component_name = os.path.splitext(filename)[0]
    
    component_code = f"""import React, {{ useState }} from 'react';
import {{ Link, useNavigate }} from 'react-router-dom';

export default function {component_name}() {{
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface antialiased relative selection:bg-secondary-fixed selection:text-on-secondary-fixed">
      {body_jsx}
    </div>
  );
}}
"""
    os.makedirs(os.path.dirname(target_file), exist_ok=True)
    with open(target_file, "w", encoding="utf-8") as f:
        f.write(component_code)
    print(f"Converted {folder} -> {target_file}")

if __name__ == "__main__":
    for folder, target in SCREEN_MAPPING.items():
        convert_folder(folder, target)
    print("All screens converted successfully!")
