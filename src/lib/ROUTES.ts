export const PAGES = {
  "_ROOT": (sp?: Record<string, string | number>) =>  { return `/${appendSp(sp)}` },
  "admin": (sp?: Record<string, string | number>) =>  { return `/admin${appendSp(sp)}` },
  "admin_users": (sp?: Record<string, string | number>) =>  { return `/admin/users${appendSp(sp)}` },
  "admin_users_username": (params: {username: string | number}, sp?: Record<string, string | number>) =>  { return `/admin/users/${params.username}${appendSp(sp)}` },
  "food": (sp?: Record<string, string | number>) =>  { return `/food${appendSp(sp)}` },
  "profile": (sp?: Record<string, string | number>) =>  { return `/profile${appendSp(sp)}` },
  "settings": (sp?: Record<string, string | number>) =>  { return `/settings${appendSp(sp)}` },
  "settings_account": (sp?: Record<string, string | number>) =>  { return `/settings/account${appendSp(sp)}` },
  "settings_connections": (sp?: Record<string, string | number>) =>  { return `/settings/connections${appendSp(sp)}` },
  "settings_language": (sp?: Record<string, string | number>) =>  { return `/settings/language${appendSp(sp)}` },
  "settings_profile": (sp?: Record<string, string | number>) =>  { return `/settings/profile${appendSp(sp)}` },
  "settings_theme": (sp?: Record<string, string | number>) =>  { return `/settings/theme${appendSp(sp)}` },
  "settings_units": (sp?: Record<string, string | number>) =>  { return `/settings/units${appendSp(sp)}` },
  "settings_workouts": (sp?: Record<string, string | number>) =>  { return `/settings/workouts${appendSp(sp)}` },
  "workout": (sp?: Record<string, string | number>) =>  { return `/workout${appendSp(sp)}` },
  "workout_community": (sp?: Record<string, string | number>) =>  { return `/workout/community${appendSp(sp)}` },
  "workout_log": (sp?: Record<string, string | number>) =>  { return `/workout/log${appendSp(sp)}` },
  "workout_log_add_exercise": (sp?: Record<string, string | number>) =>  { return `/workout/log/add-exercise${appendSp(sp)}` },
  "workout_self": (sp?: Record<string, string | number>) =>  { return `/workout/self${appendSp(sp)}` }
          }

export const SERVERS = {
  "assets_site.webmanifest": (sp?: Record<string, string | number>) =>  { return `/site.webmanifest${appendSp(sp)}` },
  "assets_sitemap.xml": (sp?: Record<string, string | number>) =>  { return `/sitemap.xml${appendSp(sp)}` }
          }

export const ACTIONS = {
  
          }

const appendSp = (sp?: Record<string, string | number | undefined>) => {
  if (sp === undefined) return ''
  const mapping = Object.entries(sp)
    .filter(c => c[1] !== undefined)
    .map(c => [c[0], String(c[1])])

  const formated = new URLSearchParams(mapping).toString()
  if (formated) {
    return `?${formated}`
  }
  return ''
}
