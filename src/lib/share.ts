export async function shareInvitation(
  title: string,
  text: string,
  url: string
): Promise<{ success: boolean; sharedVia: 'native' | 'clipboard' }> {
  if (navigator.share) {
    try {
      await navigator.share({
        title,
        text,
        url,
      });
      return { success: true, sharedVia: 'native' };
    } catch (err: unknown) {
      if ((err as Error)?.name === 'AbortError') {
        return { success: false, sharedVia: 'native' };
      }
      // Continue to clipboard fallback if native sharing failed
    }
  }

  // Clipboard fallback
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url);
      return { success: true, sharedVia: 'clipboard' };
    } else {
      // Legacy fallback
      const textArea = document.createElement('textarea');
      textArea.value = url;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return { success: true, sharedVia: 'clipboard' };
    }
  } catch (error) {
    console.error('Failed to copy link', error);
    return { success: false, sharedVia: 'clipboard' };
  }
}
