import supabase from '../services/supabaseClient.js';
import { nanoid } from 'nanoid';


export const shortenUrl = async (req, res) => {
  const { original_url } = req.body;
  const short_code = nanoid(7);
  const user_id = req.userId;

  const { data, error } = await supabase
    .from('urls')
    .insert([{ original_url, short_code, user_id }])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  res.json({
    short_url: `${req.protocol}://${req.get('host')}:8080/${data.short_code}`,
    ...data,
  });
};


export const redirectUrl = async (req, res) => {
  const { short_code } = req.params;

  const { data: urlData, error } = await supabase
    .from('urls')
    .select()
    .eq('short_code', short_code)
    .single();

  if (error || !urlData) return res.status(404).send('Not Found');

  await supabase
    .from('urls')
    .update({ 
      clicks: urlData.clicks + 1,
      last_accessed: new Date().toISOString(),
    })
    .eq('id', urlData.id);

  res.redirect(urlData.original_url);
};



export const getAnalytics = async (req, res) => {
  const user_id = req.userId;

  const { data: urls, error } = await supabase
    .from('urls')
    .select()
    .eq('user_id', user_id);

  if (error) return res.status(500).json({ error: error.message });

  const now = new Date();
  const oneMonthAgo = new Date(now.setMonth(now.getMonth() - 1));

  const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);
  const activeLinks = urls.filter(
    (url) => url.last_accessed && new Date(url.last_accessed) >= oneMonthAgo
  ).length;
  const inactiveLinks = urls.length - activeLinks;

  res.json({
    total_links: urls.length,
    total_clicks: totalClicks,
    active_links: activeLinks,
    inactive_links: inactiveLinks,
  });
};



export const getUserUrls = async (req, res) => {
  const user_id = req.userId;

  const { data, error } = await supabase
    .from('urls')
    .select()
    .eq('user_id', user_id)
    .order('created_at', { ascending: false });

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
};
