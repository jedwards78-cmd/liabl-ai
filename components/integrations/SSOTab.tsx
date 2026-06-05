'use client'
import { useState } from 'react'

const PROVIDERS = [
  { id:'azure',  name:'Azure Active Directory', logo:'🔷', protocol:'SAML 2.0 + OIDC', connected:true,  users:14, since:'Connected Feb 2026' },
  { id:'okta',   name:'Okta',                   logo:'🔵', protocol:'SAML 2.0 + OIDC', connected:false, users:0,  since:null },
  { id:'google', name:'Google Workspace',        logo:'🔴', protocol:'OIDC',            connected:false, users:0,  since:null },
  { id:'auth0',  name:'Auth0',                   logo:'⚫', protocol:'OIDC',            connected:false, users:0,  since:null },
  { id:'one',    name:'OneLogin',                logo:'🟠', protocol:'SAML 2.0',        connected:false, users:0,  since:null },
]

const SCIM_EVENTS = [
  { time:'9:02 AM', event:'user.provisioned',   user:'Tyler Brooks', detail:'New hire — manager role assigned automatically' },
  { time:'8:44 AM', event:'user.deprovisioned', user:'Alex Santos',  detail:'Left org — LIABL access revoked within 2 minutes' },
  { time:'Yesterday',event:'user.provisioned',  user:'Priya Nair',   detail:'New hire — staff role assigned automatically' },
]

export default function SSOTab() {
  const [expanded, setExpanded] = useState<string|null>('azure')
  const [jit,      setJit]      = useState(true)
  const [scim,     setScim]     = useState(true)
  const [forceSSO, setForceSSO] = useState(false)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-serif text-xl mb-1">Identity &amp; Single Sign-On</h2>
        <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">
          Enterprise operators authenticate their team through any major identity provider. LIABL supports SAML 2.0 and OIDC — no passwords to manage, no separate LIABL accounts for your staff.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[{icon:'🔑',title:'SP-initiated SSO',desc:'Staff click "Sign in with [Provider]" on LIABL. Redirected to your IdP, authenticated, returned automatically.'},{icon:'🏢',title:'IdP-initiated SSO',desc:'Staff click the LIABL tile in your Okta or Azure portal. Authenticated in one click.'},{icon:'⚡',title:'Just-in-time provisioning',desc:'First SSO sign-in auto-creates a LIABL account with role from IdP group mapping.'}].map(p=>(
          <div key={p.title} className="bg-white rounded-xl border border-black/10 p-4">
            <div className="text-2xl mb-2">{p.icon}</div>
            <div className="font-semibold text-sm text-ink mb-1">{p.title}</div>
            <p className="text-xs text-gray-400 leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Identity providers</div>
        <div className="space-y-3">
          {PROVIDERS.map(p=>(
            <div key={p.id} className="bg-white rounded-2xl border border-black/10 overflow-hidden">
              <div onClick={()=>setExpanded(expanded===p.id?null:p.id)} className="flex items-center gap-4 px-5 py-4 cursor-pointer hover:bg-surface/40 transition-colors">
                <span className="text-2xl">{p.logo}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-ink">{p.name}</span>
                    {p.connected&&<span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full">Connected</span>}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{p.connected?`${p.since} · ${p.users} team members synced`:'Not connected'} · {p.protocol}</div>
                </div>
                <span className="text-gray-400 text-sm">{expanded===p.id?'▲':'▼'}</span>
              </div>
              {expanded===p.id&&(
                <div className="border-t border-black/8 px-5 py-5 bg-surface/30">
                  {p.connected?(
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[{label:'Entity ID / Issuer',value:'https://auth.liabl.com/saml/azure'},{label:'ACS URL',value:'https://auth.liabl.com/saml/callback'},{label:'Metadata URL',value:'https://auth.liabl.com/saml/metadata.xml'},{label:'Certificate',value:'SHA-256: 4A:9F:2C...'}].map(({label,value})=>(
                          <div key={label} className="bg-white rounded-xl border border-black/8 p-3">
                            <div className="text-xs text-gray-400 mb-1">{label}</div>
                            <div className="font-mono text-xs text-ink truncate">{value}</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <button className="text-sm px-4 py-2 rounded-xl border border-black/20 text-gray-600 hover:bg-white">Edit config</button>
                        <button className="text-sm px-4 py-2 rounded-xl border border-black/20 text-gray-600 hover:bg-white">Test SSO</button>
                        <button className="text-sm px-4 py-2 rounded-xl border border-red-200 text-red-500 hover:bg-red-50">Disconnect</button>
                      </div>
                    </div>
                  ):(
                    <div className="space-y-3">
                      <p className="text-xs text-gray-500 leading-relaxed">Paste your {p.name} metadata URL or XML to connect.</p>
                      <div className="flex gap-2">
                        <input className="form-input flex-1 font-mono text-xs" placeholder={`https://your-${p.id}-domain.com/metadata`}/>
                        <button className="px-4 py-2 bg-brand text-white rounded-xl text-sm font-medium hover:opacity-90 shrink-0">Connect</button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-serif text-lg mb-1">SCIM user provisioning</h3>
        <p className="text-sm text-gray-500 mb-4 leading-relaxed max-w-2xl">
          SCIM keeps LIABL in sync with your IdP. When someone joins your org, their LIABL account is created automatically. When they leave, access is revoked within minutes.
        </p>
        <div className="bg-white rounded-2xl border border-black/10 p-5 mb-4">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">SCIM endpoint URL</label>
              <div className="flex gap-2">
                <input className="form-input flex-1 font-mono text-sm" readOnly value="https://api.liabl.com/scim/v2"/>
                <button className="text-xs px-3 py-2 border border-black/20 rounded-xl text-gray-600 hover:bg-surface shrink-0">Copy</button>
              </div>
            </div>
            <div className="space-y-3 pt-2 border-t border-black/8">
              {[{label:'Just-in-time (JIT) provisioning',sub:'Create LIABL accounts automatically on first SSO login',val:jit,set:setJit},{label:'SCIM automatic deprovisioning',sub:'Revoke access when user is removed from IdP',val:scim,set:setScim},{label:'Enforce SSO',sub:'Staff must use SSO — no email/password fallback',val:forceSSO,set:setForceSSO}].map(({label,sub,val,set})=>(
                <div key={label} className="flex items-center justify-between gap-4">
                  <div><div className="text-sm font-medium text-ink">{label}</div><div className="text-xs text-gray-400">{sub}</div></div>
                  <button onClick={()=>set(!val)} className={`w-11 h-6 rounded-full transition-all shrink-0 relative ${val?'bg-brand':'bg-gray-200'}`}>
                    <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all" style={{left:val?'22px':'2px'}}/>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-black/10 overflow-hidden">
          <div className="px-5 py-3 border-b border-black/8 text-xs font-semibold text-gray-400 uppercase tracking-wider">Recent provisioning events</div>
          {SCIM_EVENTS.map((e,i)=>(
            <div key={i} className="flex items-start gap-3 px-5 py-3 border-b border-black/5 last:border-0 text-xs">
              <span className="text-gray-400 shrink-0 w-20">{e.time}</span>
              <span className={`px-2 py-0.5 rounded-full font-medium shrink-0 ${e.event==='user.provisioned'?'bg-emerald-50 text-emerald-700':'bg-red-50 text-red-600'}`}>{e.event}</span>
              <div><div className="font-medium text-ink">{e.user}</div><div className="text-gray-400">{e.detail}</div></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
