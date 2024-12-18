import { useState, useEffect } from "react";


interface ExpenceTracker {
    id: number;
    category: string;
    detail: string;
    mount: number;
}

const categoryOptions = [
    { cat: 'Ingreso' },
    { cat: 'Egreso' }
];

const ExpenceTrackerComp = (): JSX.Element => {
    const [dats, setDats] = useState<ExpenceTracker[]>([]);
    const [addDetail, setaddDetail] = useState<string>('');
    const [addMount, setAddMount] = useState<number>(0);
    const [addCategory, setAddCategory] = useState<string>('');

    useEffect(() => {
        const localDats = localStorage.getItem("dats");
        if (localDats) {
            setDats(JSON.parse(localDats));
        }
    }, []);

    const saveData = () => {
        localStorage.setItem("dats", JSON.stringify(dats));
    };

    const getData = () => {
        const localDats = localStorage.getItem("dats");
        if (localDats) {
            setDats(JSON.parse(localDats));
        }
    };

    const detailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setaddDetail(e.target.value);
    };

    const categoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setAddCategory(e.target.value);
    };

    const mountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddMount(parseFloat(e.target.value));
    };

    const addItem = (e: React.FormEvent) => {
        e.preventDefault();
        const newItem: ExpenceTracker = {
            id: dats.length + 1,
            detail: addDetail,
            mount: addMount,
            category: addCategory
        };
        const updateDts = [...dats, newItem];
        setDats(updateDts);
        setaddDetail('');
        setAddMount(0);
        setAddCategory('');
        localStorage.setItem("dats", JSON.stringify(updateDts));
    };

    const deletItems = (id: number) => {
        const updateDts = dats.filter(item => item.id !== id);
        setDats(updateDts);
        localStorage.setItem("dats", JSON.stringify(updateDts));
    };

    const summaryMounts = (data: ExpenceTracker[]) => {
        return data.reduce((total, item) => total + item.mount, 0);
    };

    const result = summaryMounts(dats);
    let message: string;
    if (result > 0) {
        message = `La ganancia total es de $${result}`;
    } else if (result < 0) {
        message = `La pérdida total es de $${result}`;
    } else {
        message = `El total es de $${result}`;
    }

    const buttonStyles: React.CSSProperties = {
        background: 'transparent',
        borderColor: '#42a5f5',
        color: '#42a5f5',
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        fontSize: '1rem',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
    };

    const handleHover = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (e.type === 'mouseenter') {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = '#004a9b';
        } else {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = '#42a5f5';
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ boxShadow: '0px 0px 15px grey', display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '50%', padding: '5svw', marginTop: '5svw' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <h1 style={{ display: 'flex', flexDirection: 'row' }}>Detalles y Montos</h1>
                    <form onSubmit={addItem} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div
                            style={{
                                margin: '.5svw',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '15svw'
                            }}
                        >
                            <label>Detalle</label>
                            <input
                                style={{ width: '10svw' }}
                                onChange={detailChange}
                                value={addDetail}
                                type="text" placeholder="Detalle"
                            >
                            </input>
                        </div>
                        <div
                            style={{
                                margin: '.5svw',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '15svw'
                            }}
                        >
                            <label>Category Select</label>
                            <select name='category' onChange={categoryChange} value={addCategory}>
                                <option value='Egreso'>Egreso</option>
                                <option value='Ingreso'>Ingreso</option>
                            </select>
                        </div>
                        <div
                            style={{
                                margin: '.5svw',
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '15svw'
                            }}
                        >
                            <label>Monto</label>
                            <input
                                style={{ width: '10svw' }}
                                onChange={mountChange}
                                value={addMount}
                                type="number"
                                placeholder="Precio$"
                            >
                            </input>
                        </div>
                        <button>Añadir</button>
                    </form>
                </div>
                <div style={{ marginTop: '2svw', width: '30svw', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <table style={{ padding: '1svw', width: '20svw' }}>
                        <thead>
                            <tr>
                                <th style={{ border: 'solid 1px', backgroundColor: 'yellow' }}>Detalle</th>
                                <th style={{ border: 'solid 1px', backgroundColor: 'yellow' }}>Categoria</th>
                                <th style={{ border: 'solid 1px', backgroundColor: 'yellow' }}>Monto</th>
                                <th style={{ border: 'solid 1px', backgroundColor: 'yellow' }}>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dats.map((item, id) => (
                                <tr key={id}>
                                    <td style={{ color: item.mount < 0 ? 'red' : item.mount === 0 ? 'gray' : 'green', borderBottom: 'solid black 1px' }}>
                                        {item.detail}
                                    </td>
                                    <td style={{ color: item.mount < 0 ? 'red' : item.mount === 0 ? 'gray' : 'green', borderBottom: 'solid black 1px' }}>
                                        {item.category}
                                    </td>
                                    <td style={{ color: item.mount < 0 ? 'red' : item.mount === 0 ? 'gray' : 'green', borderBottom: 'solid black 1px' }}>
                                        ${item.mount}
                                    </td>
                                    <td style={{ textAlign: 'center', borderBottom: 'solid black 1px' }}>
                                        <button
                                            onClick={() => deletItems(item.id)}
                                            style={{
                                                background: 'transparent',
                                                border: 'solid #42a5f5 1px',
                                                color: '#42a5f5',
                                                borderRadius: '5px',
                                                margin: '1px'
                                            }}
                                        >
                                            Borrar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h3 style={{ color: result < 0 ? 'red' : result === 0 ? 'gray' : 'green', }}>{message}</h3>
                </div>
            </div>
        </div>
    );
};

export { ExpenceTrackerComp };
