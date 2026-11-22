import { renderStub } from '../../assets/js/pageStub.js';

export function render() {
  return renderStub({
    titleTr: 'Kayıtlar',
    iconName: 'history',
    descTr: 'Son kullanılan araçlar, komutlar ve işlemlerin geçmişi burada listelenecek.',
  });
}
