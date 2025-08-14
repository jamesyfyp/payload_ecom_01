export function serializeRichText(richText: any): string {
  if (!richText) return ''

  if (typeof richText === 'string') return richText

  if (Array.isArray(richText)) {
    return richText
      .map((node: any) => {
        const childrenText = (children: any[] = []) =>
          children.map((child: any) => child.text || '').join('')

        switch (node.type) {
          case 'heading':
            return `\n${childrenText(node.children)}\n`

          case 'paragraph':
            return childrenText(node.children)

          case 'list':
            const isOrdered = node.listType === 'number' || node.tag === 'ol'
            return (
              '\n' +
              node.children
                ?.map((item: any, idx: number) => {
                  const itemText = childrenText(item.children)
                  return isOrdered ? `${idx + 1}. ${itemText}` : `• ${itemText}`
                })
                .join('\n') +
              '\n'
            )

          case 'ul':
          case 'ol':
            const ordered = node.tag === 'ol'
            return (
              '\n' +
              node.children
                ?.map((item: any, idx: number) => {
                  const itemText = childrenText(item.children)
                  return ordered ? `${idx + 1}. ${itemText}` : `• ${itemText}`
                })
                .join('\n') +
              '\n'
            )

          case 'h1':
          case 'h2':
          case 'h3':
          case 'h4':
          case 'h5':
          case 'h6':
            return `\n${childrenText(node.children)}\n`

          default:
            return node.text || ''
        }
      })
      .join(' ')
      .replace(/\n\s*\n/g, '\n\n') // normalize spacing
      .trim()
  }

  // fallback for non-array structure
  if (richText.children) {
    return richText.children.map((child: any) => child.text || '').join('')
  }

  return ''
}
