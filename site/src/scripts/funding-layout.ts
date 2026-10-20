type Row = { keys: string[]; layout?: 'wide-first' | 'city' };

// Approved reading order. Move the existing controls, preserving their names,
// values and provider handlers. These groups have dividers, not visible titles.
const groups: Row[][] = [
  [
    { keys: ['businessLegalName', 'dba'] },
    { keys: ['bizStreet', 'dateOfIncorporation'], layout: 'wide-first' },
    { keys: ['bizCity', 'bizState', 'bizZip'], layout: 'city' },
  ],
  [{ keys: ['entityType', 'industry', 'ein'] }],
  [
    { keys: ['requestedAmount', 'declaredAnnualRevenue'] },
    { keys: ['useOfFunds'] },
  ],
  [
    { keys: ['fullName', 'dateOfBirth'], layout: 'wide-first' },
    { keys: ['email', 'cellPhone'] },
    { keys: ['declaredCreditScore', 'ssn', 'ownerOwnershipPct'] },
  ],
  [
    { keys: ['acceptsCreditCards', 'declaredMcaPositions'] },
    { keys: ['currentPositions', 'priorCashAdvanceBalance'] },
  ],
  [{ keys: ['informationForAiAnalysis'] }],
];

export function createFundingLayout(root: ShadowRoot) {
  let additionalInformation: string | undefined;
  const rememberAdditionalInformation = (event: Event) => {
    const control = event.target;
    if (control instanceof HTMLTextAreaElement && control.name === 'f_informationForAiAnalysis') {
      additionalInformation = control.value;
    }
  };
  root.addEventListener('input', rememberAdditionalInformation);
  root.addEventListener('change', rememberAdditionalInformation);

  return () => {
    const additionalInput = root.querySelector<HTMLInputElement>(
      '.mf-field[data-key="informationForAiAnalysis"] input',
    );
    if (additionalInput) {
      const textarea = document.createElement('textarea');
      // Retain the provider's field identity and original length limit.
      for (const attribute of additionalInput.attributes) {
        if (attribute.name !== 'type') textarea.setAttribute(attribute.name, attribute.value);
      }
      textarea.className = 'mf-textarea';
      textarea.rows = 3;
      textarea.value = additionalInformation ?? additionalInput.value;
      additionalInput.replaceWith(textarea);
    }

    // Conditional questions cause MyDeskiso to rebuild its field container.
    // Only group freshly rendered fields, so edits/errors never move a focused control.
    const containers = new Set(
      Array.from(root.querySelectorAll<HTMLElement>('.mf-field'))
        .filter((field) => !field.parentElement?.classList.contains('elya-field-row'))
        .map((field) => field.parentElement)
        .filter((container): container is HTMLElement => Boolean(container)),
    );

    for (const container of containers) {
      const fields = Array.from(container.children)
        .filter((child): child is HTMLElement => child instanceof HTMLElement && child.classList.contains('mf-field'));
      const remaining = new Map(fields.map((field) => [field.dataset.key, field]));
      const fragment = document.createDocumentFragment();

      const appendRow = (group: HTMLElement, rowFields: HTMLElement[], layout?: string) => {
        if (!rowFields.length) return;
        const row = document.createElement('div');
        row.className = 'elya-field-row';
        row.dataset.columns = String(rowFields.length);
        if (layout) row.dataset.layout = layout;
        row.append(...rowFields);
        group.append(row);
      };

      for (const definition of groups) {
        const group = document.createElement('div');
        group.className = 'elya-field-group';
        for (const row of definition) {
          const rowFields: HTMLElement[] = [];
          for (const key of row.keys) {
            const field = remaining.get(key);
            if (field) {
              rowFields.push(field);
              remaining.delete(key);
            }
          }
          appendRow(group, rowFields, row.layout);
        }
        if (group.children.length) fragment.append(group);
      }

      // New provider questions remain visible even before a layout is assigned.
      if (remaining.size) {
        const group = document.createElement('div');
        group.className = 'elya-field-group';
        for (const field of remaining.values()) appendRow(group, [field]);
        fragment.append(group);
      }
      container.replaceChildren(fragment);
    }
  };
}
