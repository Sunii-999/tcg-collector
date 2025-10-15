const CardComponent = ({ card }) => {
    return (
        <div className="p-4 border rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <img src={card.images.small} alt={card.name} className="w-full h-auto rounded" />
            <h3 className="mt-2 text-lg font-semibold">{card.name}</h3>
            <p className="text-sm text-gray-500">{card.set.name}</p>
        </div>
    );
};

export default CardComponent;