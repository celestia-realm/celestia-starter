import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import {
  ButtonPreview,
  CardPreview,
  InputPreview,
  LabelPreview,
  MenuPreview,
} from '@/components/previews';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ButtonPreview,
    CardPreview,
    InputPreview,
    LabelPreview,
    MenuPreview,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
