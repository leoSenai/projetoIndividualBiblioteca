import Menu from '../components/menu'
import CreateReport from '../components/geradorRelatório';
import PageBarTitleOnly from '../components/pageBarTitleOnly';

export default function resumo() {
    return <>
        <Menu />
        <PageBarTitleOnly title="Relatórios" />
        <CreateReport />
    </>
}